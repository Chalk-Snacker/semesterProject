import pg from "pg";
import { dbConnectionString } from "./dbConfig.mjs";
import { lvlUp } from "../middleware/lvlUpUser.mjs";
import crypto from "node:crypto";
import { inventory } from "./user.mjs";

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
  async updateUserInformation(user, nick, password) {
    const client = new pg.Client(this.#credentials);

    try {
      await client.connect();
      let output = await client.query('UPDATE "public"."Users" SET "nick" = $2::Text, "password" = $3::Text WHERE "id" = $1 RETURNING *;', [
        user,
        nick,
        password,
      ]);
      if (output.rows.length > 0) {
        console.log("username and password are successfully updated");
        console.log(output.rows[0].nick);
        return output.rows[0].nick;
      }
    } catch (error) {
      console.error("Error updating user information:", error);
      console.log("Request failed");
    } finally {
      client.end();
    }
  }
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
      if (output.rows.length > 0) {
        // console.log("user exists");
      } else {
        console.log("user does not exist");
      }

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
      console.log("Request succeeded:", output.rows[0].skills[skillName]);

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

  async equippedItems(userId, item) {
    const client = new pg.Client(this.#credentials);

    try {
      await client.connect();

      let output = await client.query('SELECT "inventory" FROM "public"."Users" WHERE "id" = $1', [userId]);
      if (output.rows.length > 0) {
        const inventory = output.rows[0].inventory;
        const { category, itemSlot, foundItem } = findItemTypeAndItemSlot(inventory, item);
        if (category && itemSlot) {
          const query = `UPDATE "public"."Users" SET "equipped" = jsonb_set("equipped", '{${itemSlot}}', $1) WHERE "id" = $2 RETURNING *;`;
          try {
            const { rows } = await client.query(query, [foundItem, userId]);
          } catch (error) {
            console.error("Error executing query:", error.message);
          }
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      await client.end();
    }
    function findItemTypeAndItemSlot(aInventory, aItem) {
      for (const category in aInventory) {
        for (let itemSlot in aInventory[category]) {
          if (itemSlot === "inventoryCategory") continue;
          const foundItem = aInventory[category][itemSlot].find((element) => element.name == aItem);
          if (foundItem) {
            switch (itemSlot) {
              case "sword":
              case "axe":
              case "mace":
              case "staff":
              case "bow":
                itemSlot = "weapon";
                break;
            }
            return { category, itemSlot, foundItem: foundItem };
          }
        }
      }
      return { category: null, itemSlot: null }; // default om vi ikke fant noe item
    }
  }

  async equippedItems2(userId, item) {
    const client = new pg.Client(this.#credentials);

    try {
      await client.connect();
      let output = await client.query('SELECT * FROM "public"."Inventory" WHERE "id" = $1', [userId]);
      console.log(output.rows[0]);
      // let output = await client.query('SELECT "inventory" FROM "public"."Users" WHERE "id" = $1', [userId]);
      // if (output.rows.length > 0) {
      //   const inventory = output.rows[0].inventory;
      //   const { category, itemSlot, foundItem } = findItemTypeAndItemSlot(inventory, item);
      //   if (category && itemSlot) {
      //     const query = `UPDATE "public"."Users" SET "equipped" = jsonb_set("equipped", '{${itemSlot}}', $1) WHERE "id" = $2 RETURNING *;`;
      //     try {
      //       const { rows } = await client.query(query, [foundItem, userId]);
      //     } catch (error) {
      //       console.error("Error executing query:", error.message);
      //     }
      //   }
      // }
    } catch (error) {
      console.error(error);
    } finally {
      await client.end();
    }
    function findItemTypeAndItemSlot(aInventory, aItem) {
      for (const category in aInventory) {
        for (let itemSlot in aInventory[category]) {
          if (itemSlot === "inventoryCategory") continue;
          const foundItem = aInventory[category][itemSlot].find((element) => element.name == aItem);
          if (foundItem) {
            switch (itemSlot) {
              case "sword":
              case "axe":
              case "mace":
              case "staff":
              case "bow":
                itemSlot = "weapon";
                break;
            }
            return { category, itemSlot, foundItem: foundItem };
          }
        }
      }
      return { category: null, itemSlot: null }; // default om vi ikke fant noe item
    }
  }

  async sellItem(userId, item) {
    const client = new pg.Client(this.#credentials);
    try {
      await client.connect();

      let output = await client.query('SELECT "inventory" FROM "public"."Users" WHERE "id" = $1', [userId]);
      if (output.rows.length > 0) {
        const inventory = output.rows[0].inventory;
        const { category, itemSlot } = findItemTypeAndItemSlot(inventory, item);

        if (category && itemSlot) {
          const updatedInventory = removeItemFromInventory(inventory, category, itemSlot, item);
          try {
            await client.query(`UPDATE "public"."Users" SET "inventory" = $1 WHERE "id" = $2 RETURNING *;`, [updatedInventory, userId]);
          } catch (error) {
            console.error("Error executing query:", error.message);
          }
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      await client.end();
    }

    function findItemTypeAndItemSlot(aInventory, aItem) {
      for (const category in aInventory) {
        for (let itemSlot in aInventory[category]) {
          if (itemSlot === "inventoryCategory") continue;
          const foundItem = aInventory[category][itemSlot].find((element) => element.name == aItem);
          if (foundItem) {
            return { category, itemSlot };
          }
        }
      }
      return { category: null, itemSlot: null }; // default if no item was found
    }

    function removeItemFromInventory(inventory, category, itemSlot, itemName) {
      if (inventory[category] && inventory[category][itemSlot]) {
        inventory[category][itemSlot] = inventory[category][itemSlot].filter((item) => item.name !== itemName);
      }
      return inventory;
    }
  }

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
              if (item.name === itemName) {
                console.log("Item found in armor:", item);
                if (action == "add") {
                  await this.insertItemIntoInventory("armor", armorSetName, { [itemSlot]: item });
                  return { [itemSlot]: item }; // returning the item as a key in an object with itemslot as property name
                } else if (action == "delete") {
                  await this.removeItemFromInventory(userId, "armor", armorSetName, itemSlot);
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
              if (item.name === itemName) {
                console.log("Item found in weapons:", item);
                if (action == "add") {
                  await this.insertItemIntoInventory("weapon", weaponSetName, { [itemSlot]: item });

                  return { [itemSlot]: item }; // returning the item as a key in an object with itemslot as property name
                } else if (action == "delete") {
                  await this.removeItemFromInventory(userId, "weapon", weaponSetName, itemSlot);
                }
              }
            }
          }
        }
      }
    } catch (error) {
      console.error("Error in findItem:", error);
      return null; // Ensure the function returns null in case of an error
    } finally {
      await client.end();
    }
  }

  async insertItemIntoInventory(category, setName, item) {
    const client = new pg.Client(this.#credentials);
    try {
      await client.connect();

      // Check if the set exists in the inventory
      const checkSetQuery = `
        SELECT EXISTS (
          SELECT 1
          FROM "public"."Inventory"
          WHERE "${category}"->>'${setName}' IS NOT NULL
        ) AS "setExists";
      `;
      const checkSetResult = await client.query(checkSetQuery);
      const setExists = checkSetResult.rows[0].setExists;

      // Construct the update query using jsonb_set
      let updateQuery;
      if (setExists) {
        // If the set exists, append the item to the existing set
        updateQuery = `
          UPDATE "public"."Inventory"
          SET "${category}" = jsonb_set("${category}", '{"${setName}"}', "${category}"->'${setName}' || $1, true)
          WHERE "${category}"->>'${setName}' IS NOT NULL;
        `;
      } else {
        // If the set does not exist, create a new set with the item
        updateQuery = `
          UPDATE "public"."Inventory"
          SET "${category}" = COALESCE(
            jsonb_set("${category}", '{"${setName}"}', $1, true),
            '{}'::jsonb
          )
          WHERE "${category}"->>'${setName}' IS NOT NULL;
        `;
      }

      const values = [JSON.stringify(item)]; // Convert the item to JSON string

      // Execute the update query
      await client.query(updateQuery, values);
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

      const removeItemQuery = `
        UPDATE "public"."Inventory"
        SET ${category} = jsonb_set(${category}, '{${setName}, ${itemSlot}}', 'null'::jsonb)
        WHERE "id" = $1;
      `;
      await client.query(removeItemQuery, [userId]);
    } catch (error) {
      console.error("Error removing item from inventory:", error);
    } finally {
      await client.end();
    }
  }

  async deleteUser(user) {
    const client = new pg.Client(this.#credentials);

    try {
      await client.connect();
      const output = await client.query('DELETE from "public"."Users"  where id = $1;', [user.userId]);

      // Client.Query returns an object of type pg.Result (https://node-postgres.com/apis/result)
      // Of special intrest is the rows and rowCount properties of this object.

      //TODO: Did the user get deleted?
    } catch (error) {
      //TODO : Error handling?? Remember that this is a module seperate from your server
    } finally {
      client.end(); // Always disconnect from the database.
    }

    return user;
  }

  async createUser(user) {
    const client = new pg.Client(this.#credentials);
    try {
      await client.connect();
      //gjør sjekk på om brukernavn eller mail allerede eksisterer

      let output = await client.query(
        'INSERT INTO "public"."Users"("nick", "email", "password","skills","inventory", "equipped" ) VALUES($1::Text, $2::Text, $3::Text, $4::JSONB, $5::JSONB, $6::JSONB) RETURNING id;',
        [user.nick, user.email, user.pswHash, JSON.stringify(user.skills), JSON.stringify(user.inventory), JSON.stringify(user.equipped)]
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
      for (let i = 0; i < armorQualityType.length; i++) {
        armorSet[armorQualityType[i]] = {};
      }
      for (let i = 0; i < weaponQualityType.length; i++) {
        weaponSet[weaponQualityType[i]] = {};
      }
      output = await client.query(
        'INSERT INTO "public"."Inventory"("armor", "weapon", "id") VALUES($1::JSONB, $2::JSONB, $3::Integer) RETURNING  *;', // add consumables and resource
        [armorSet, weaponSet, user.id]
      );
    } catch (error) {
      console.error(error);
      //TODO : Error handling?? Remember that this is a module seperate from your server
    } finally {
      client.end(); // Always disconnect from the database.
    }
    return user;
  }

  async getUser(idInput) {
    const client = new pg.Client(this.#credentials);
    try {
      await client.connect();
      const output = await client.query('SELECT * FROM "public"."Users" WHERE "id" = $1', [idInput]);
      if (output.rows.length > 0) {
        return output.rows[0]; // return the user
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

  async getItemsFromShop() {
    const client = new pg.Client(this.#credentials);
    try {
      await client.connect();
      const output = await client.query('SELECT * FROM "public"."Shop"');
      if (output.rows.length > 0) {
        return output.rows; // return the items
      } else {
        // console.log("No items in shop");
        return undefined;
      }
    } catch (error) {
      console.error(error);
      //TODO : Error handling?? Remember that this is a module seperate from your server
    } finally {
      client.end(); // Always disconnect from the database.
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
        // console.log("No items in shop");
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
