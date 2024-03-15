import pg from "pg";
import { dbConnectionString } from "./dbConfig.mjs";
import { lvlUp } from "./skills.mjs";
import { inventory } from "./inventory.mjs";
import { User } from "./user.mjs";
// import crypto from "node:crypto";

if (dbConnectionString == undefined) {
  throw "You forgot the db connection string";
}

// TODO: is the structure / design of the DBManager as good as it could be?

class DBManager {
  #credentials = {};
  constructor(connectionString) {
    this.#credentials = {
      connectionString,
      ssl: process.env.DB_SSL === "true" ? process.env.DB_SSL : false,
    };
  }

  // ------------- USER -------------
  async deleteUser(userId) {
    const client = new pg.Client(this.#credentials);

    try {
      await client.connect();
      await client.query('DELETE from "public"."Users"  where id = $1;', [userId]);

      // Client.Query returns an object of type pg.Result (https://node-postgres.com/apis/result)
      // Of special intrest is the rows and rowCount properties of this object.

      //TODO: Did the user get deleted?
    } catch (error) {
      //TODO : Error handling?? Remember that this is a module seperate from your server
    } finally {
      client.end(); // Always disconnect from the database.
    }
  }
  async createUser(user) {
    const client = new pg.Client(this.#credentials);

    try {
      await client.connect();

      let output = await client.query(
        'INSERT INTO "public"."Users"("nick", "email", "password","skills") VALUES($1::Text, $2::Text, $3::Text, $4::JSONB) RETURNING id;',
        [user.nick, user.email, user.pswHash, JSON.stringify(user.skills)]
      );
      // Client.Query returns an object of type pg.Result (https://node-postgres.com/apis/result)
      // Of special intrest is the rows and rowCount properties of this object.

      if (output.rows.length == 1) {
        // We stored the user in the DB.
        user.id = output.rows[0].id;
      }
      output = await client.query('SELECT  COUNT(*) FROM "public"."Inventory"');
      const armorSet = {};
      const weaponSet = {};
      const armorQualityType = Object.keys(inventory.armor);
      const weaponQualityType = Object.keys(inventory.weapon);
      const equipped = inventory.equipped;
      const consumables = inventory.consumables;
      for (let i = 0; i < armorQualityType.length; i++) {
        armorSet[armorQualityType[i]] = {};
      }
      for (let i = 0; i < weaponQualityType.length; i++) {
        weaponSet[weaponQualityType[i]] = {};
      }
      output = await client.query(
        'INSERT INTO "public"."Inventory"("armor", "weapon", "id", "equipped", "consumables") VALUES($1::JSONB, $2::JSONB, $3::Integer, $4::JSONB, $5::JSONB) RETURNING  *;', // add consumables and resource
        [armorSet, weaponSet, user.id, equipped, consumables]
      );
      return user;
    } catch (error) {
      console.error(error);
      //TODO : Error handling?? Remember that this is a module seperate from your server
    } finally {
      client.end(); // Always disconnect from the database.
    }
  }
  async getUser(idInput) {
    const client = new pg.Client(this.#credentials);
    try {
      await client.connect();
      const output = await client.query('SELECT * FROM "public"."Users" WHERE "id" = $1', [idInput]);
      if (output.rows.length > 0) {
        const userData = { id: output.rows[0].id, nick: output.rows[0].nick, skills: output.rows[0].skills };
        return userData;
        // return output.rows[0]; // return the user
      } else {
        console.log("user does not exist");
        return undefined;
      }
    } catch (error) {
      console.error(error);
      //TODO : Error handling?? Remember that this is a module seperate from your server
    } finally {
      client.end(); // Always disconnect from the database.
    }
  }
  async updateUserInformation(userId, nick, password) {
    const client = new pg.Client(this.#credentials);

    try {
      await client.connect();

      let output = await client.query('UPDATE "public"."Users" SET "nick" = $2::Text, "password" = $3::Text WHERE "id" = $1 RETURNING *;', [
        userId,
        nick,
        password,
      ]);
      if (output.rows.length > 0) {
        console.log("username and password are successfully updated");
        return output.rows[0].nick;
      }
    } catch (error) {
      console.error("Error updating user information:", error);
      console.log("Request failed");
    } finally {
      client.end();
    }
  }

  // ------------- SKILLS -------------
  async updateUserSkils(idInput, skillName, updatedUserXp) {
    const client = new pg.Client(this.#credentials);

    try {
      await client.connect();
      // update xp on target skill
      let output = await client.query('UPDATE "public"."Users" SET "skills" = jsonb_set("skills", $1, $2) WHERE "id" = $3 RETURNING *;', [
        `{${skillName}, xp}`, // $1
        updatedUserXp, // $2
        idInput, // $3
      ]);

      // check if skill lvl up
      let currentXp = output.rows[0].skills[skillName].xp;
      let currentLvl = output.rows[0].skills[skillName].lvl;
      let xpThreshHold = currentLvl * 50;

      let restXp = output.rows[0].skills[skillName].restXp;
      if (currentXp >= xpThreshHold) {
        const updatedValues = lvlUp(currentXp, currentLvl, xpThreshHold, restXp);

        currentXp = updatedValues.currentXp;
        currentLvl = updatedValues.currentLvl;
        xpThreshHold = currentLvl * 50;
        restXp = 0;

        output = await client.query('UPDATE "public"."Users" SET "skills" = $1 WHERE "id" = $2 RETURNING *;', [
          {
            ...output.rows[0].skills,
            [skillName]: { xp: currentXp, lvl: currentLvl, restXp: 0, skillName: output.rows[0].skills[skillName].skillName, xpThreshHold: xpThreshHold },
          },
          idInput,
        ]);
      }

      // Client.Query returns an object of type pg.Result (https://node-postgres.com/apis/result)
      // Of special intrest is the rows and rowCount properties of this object.

      //TODO Did we update the user?
      return output.rows[0].skills;
    } catch (error) {
      console.error("Error updating user skills:", error);
      console.log("Request failed");
    } finally {
      client.end();
    }
  }

  // ------------- SHOP -------------

  async findItem(userId, itemName, action, table) {
    const client = new pg.Client(this.#credentials);
    try {
      await client.connect();
      // retrieving all sets
      const allSetsQuery = `SELECT * FROM "public"."${table}";`;
      const allSetsResult = await client.query(allSetsQuery);
      const allSets = allSetsResult.rows;

      for (const set of allSets) {
        // Process armor sets
        const armorSet = set.armor;
        if (armorSet) {
          const armorSetNames = Object.keys(armorSet);
          for (const armorSetName of armorSetNames) {
            const items = armorSet[armorSetName];
            for (const itemSlot of Object.keys(items)) {
              const item = items[itemSlot];
              if (item) {
                if (item.name === itemName) {
                  switch (action) {
                    case "buy":
                      await this.insertItemIntoInventory(userId, "armor", armorSetName, { [itemSlot]: item });
                      break;
                    case "sell":
                      await this.removeItemFromInventory(userId, "armor", armorSetName, itemSlot);
                      break;
                    case "equip":
                      if (item.itemCategory !== "consumable") {
                        await this.equipItemFromInventory(userId, "equipped", itemSlot, { [itemSlot]: item });
                      }
                      break;
                  }
                }
              }
            }
          }
        }
        // Process weapon sets
        const weaponSet = set.weapon;
        if (weaponSet) {
          const weaponSetNames = Object.keys(weaponSet);
          for (const weaponSetName of weaponSetNames) {
            const items = weaponSet[weaponSetName];
            for (const itemSlot of Object.keys(items)) {
              const item = items[itemSlot];
              if (item) {
                if (item.name === itemName) {
                  switch (action) {
                    case "buy":
                      await this.insertItemIntoInventory(userId, "weapon", weaponSetName, { [itemSlot]: item });
                      break;
                    case "sell":
                      await this.removeItemFromInventory(userId, "weapon", weaponSetName, itemSlot);
                      break;
                    case "equip":
                      await this.equipItemFromInventory(userId, "equipped", "weapon", { ["weapon"]: item });
                      break;
                  }
                }
              }
            }
          }
        }
        const consumableSet = set.consumables;
        if (consumableSet) {
          const consumableSetNames = Object.keys(consumableSet);
          for (const consumableSetName of consumableSetNames) {
            const items = consumableSet[consumableSetName];
            for (const itemSlot of Object.keys(items)) {
              const item = items[itemSlot];
              if (item) {
                if (item.name === itemName) {
                  switch (action) {
                    case "buy":
                      await this.insertItemIntoInventory(userId, "consumables", consumableSetName, { [itemSlot]: item });
                      break;
                    case "sell":
                      await this.removeItemFromInventory(userId, "consumables", consumableSetName, itemSlot);
                      break;
                  }
                }
              }
            }
          }
        }
      }
    } catch (error) {
      console.error("Error in findItem:", error);
      return null;
    } finally {
      await client.end();
    }
  }
  async insertItemIntoInventory(userId, category, setName, item) {
    const client = new pg.Client(this.#credentials);
    try {
      await client.connect();

      await client.query(
        `UPDATE "public"."Inventory" SET "${category}" = jsonb_set("${category}", '{"${setName}"}', "${category}"->'${setName}' || $2, true) WHERE "${category}"->>'${setName}' IS NOT NULL AND "id" = $1;`,
        [userId, JSON.stringify(item)]
      );

      // Execute the update query
    } catch (error) {
      console.error("Error inserting item into inventory:", error);
    } finally {
      await client.end();
    }
  }
  async removeItemFromInventory(userId, category, setName, itemSlot) {
    const client = new pg.Client(this.#credentials);
    try {
      await client.connect();

      await client.query(`UPDATE "public"."Inventory" SET ${category} = jsonb_set(${category}, '{${setName}, ${itemSlot}}', 'null'::jsonb) WHERE "id" = $1;`, [
        userId,
      ]);
    } catch (error) {
      console.error("Error removing item from inventory:", error);
    } finally {
      await client.end();
    }
  }
  async equipItemFromInventory(userId, category, itemSlot, item) {
    const client = new pg.Client(this.#credentials);
    try {
      await client.connect();

      await client.query(
        `UPDATE "public"."Inventory" SET ${category} = jsonb_set(${category}, '{${itemSlot}}', ${category}->'${itemSlot}' || $2, true) WHERE ${category}->>'${itemSlot}' IS NOT NULL AND "id" = $1;`,
        [userId, JSON.stringify(item)]
      );
    } catch (error) {
      console.error("Error equipping item from inventory,", error);
    } finally {
      await client.end();
    }
  }
  async getItemsFromInventory(userId) {
    const client = new pg.Client(this.#credentials);
    try {
      await client.connect();
      const output = await client.query('SELECT * FROM "public"."Inventory" WHERE id =$1', [userId]);
      if (output.rows.length > 0) {
        return output.rows[0]; // return the items
      } else {
        return undefined;
      }
    } catch (error) {
      console.error(error);
      //TODO : Error handling?? Remember that this is a module seperate from your server
    } finally {
      client.end(); // Always disconnect from the database.
    }
  }
  async getItemsFromShop() {
    const client = new pg.Client(this.#credentials);
    try {
      await client.connect();
      const output = await client.query('SELECT * FROM "public"."Shop"');
      if (output.rows.length > 0) {
        return output.rows; // return the items
      } else {
        return undefined;
      }
    } catch (error) {
      console.error(error);
      //TODO : Error handling?? Remember that this is a module seperate from your server
    } finally {
      client.end(); // Always disconnect from the database.
    }
  }
}
export default new DBManager(dbConnectionString);
