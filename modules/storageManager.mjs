import pg from "pg";
import { dbConnectionString } from "./dbConfig.mjs";
// import { Skill } from "./UserGameData.mjs";
import { lvlUp } from "../middleware/lvlUpUser.mjs";

if (dbConnectionString == undefined) {
  throw "You forgot the db connection string";
}

// TODO: is the structure / design of the DBManager as good as it could be?
// let currentXp = null;
// let currentLvl = null;
// let xpThreshHold = null;
// let restXp = null;
// let output = null;

class DBManager {
  #credentials = {};
  constructor(connectionString) {
    this.#credentials = {
      connectionString,
      ssl: process.env.DB_SSL === "true" ? process.env.DB_SSL : false,
    };
  }

  // delete og update i caps?

  async updateUserSkils(idInput, skillName, updatedUserXp) {
    const client = new pg.Client(this.#credentials);

    try {
      await client.connect();

      // Start a transaction
      await client.query("BEGIN");
      // update xp on target skill
      let output = await client.query('UPDATE "public"."Users" SET "skills" = jsonb_set("skills", $1, $2) WHERE "id" = $3 RETURNING *;', [
        `{${skillName}, xp}`, // $1
        updatedUserXp, // $2
        idInput, // $3
      ]);
      if (output.rows.length > 0) {
        console.log("user exists");
        // return output.rows[0].skills;
      } else {
        console.log("user does not exist");
      }

      // console.log("pre lvl up", output.rows[0]);

      // check if skill lvl up
      let currentXp = output.rows[0].skills[skillName].xp;
      let currentLvl = output.rows[0].skills[skillName].lvl;
      // xpThreshHold = output.rows[0].skills[skillName].xpThreshHold[currentLvl];
      // xpThreshHold = output.rows[0].skills[skillName].xpThreshHold;
      let xpThreshHold = currentLvl * 50;

      let restXp = output.rows[0].skills[skillName].restXp;
      console.log("currentXp", currentXp, "currentLvl", currentLvl, "xpThreshHold", xpThreshHold, "restXp", restXp);
      if (currentXp >= xpThreshHold) {
        const updatedValues = lvlUp(currentXp, currentLvl, xpThreshHold, restXp);
        console.log("11111111111111111", "currentXp", currentXp, "currentLvl", currentLvl, "xpThreshHold", xpThreshHold, "restXp", restXp);

        currentXp = updatedValues.currentXp;
        currentLvl = updatedValues.currentLvl;
        // xpThreshHold = output.rows[0].skills[skillName].xpThreshHold
        xpThreshHold = currentLvl * 50;
        restXp = 0;
        console.log("222222222222222", "currentXp", currentXp, "currentLvl", currentLvl, "xpThreshHold", xpThreshHold, "restXp", restXp);

        // // oppdater currentXp, currentLvl, og restXp til 0 manuelt
        // output = await client.query('UPDATE "public"."Users" SET "skills" = jsonb_set("skills", $1, $2) WHERE "id" = $3 RETURNING *;', [
        //   // hva vi skal erstatte
        //   `{${skillName}, xp, lvl, restXp}`,
        //   // hva vi skal erstatte med
        //   { xp: currentXp, lvl: currentLvl, restXp: 0 },
        //   idInput,
        // ]);

        output = await client.query('UPDATE "public"."Users" SET "skills" = $1 WHERE "id" = $2 RETURNING *;', [
          {
            ...output.rows[0].skills,
            [skillName]: { xp: currentXp, lvl: currentLvl, restXp: 0, skillName: output.rows[0].skills[skillName].skillName, xpThreshHold: xpThreshHold },
          },
          idInput,
        ]);
        if (output.rows.length > 0) {
          console.log("user exists");
        } else {
          console.log("user does not exist");
        }
        // console.log("lvl up", output.rows[0]);
      }

      // Commit the transaction
      await client.query("COMMIT");
      console.log("Request succeeded:", output.rows[0].skills);
      // Client.Query returns an object of type pg.Result (https://node-postgres.com/apis/result)
      // Of special intrest is the rows and rowCount properties of this object.

      //TODO Did we update the user?
      return output.rows[0].skills;
    } catch (error) {
      // Rollback the transaction in case of an error
      await client.query("ROLLBACK");
      console.error("Error updating user skills:", error);
      console.log("Request failed");
    } finally {
      console.log("yo");
      client.end();
    }
  }

  async deleteUser(user) {
    const client = new pg.Client(this.#credentials);

    try {
      await client.connect();
      const output = await client.query('Delete from "public"."Users"  where id = $1;', [user.id]);

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
      const output = await client.query(
        'INSERT INTO "public"."Users"("nick", "email", "password","skills","inventory" ) VALUES($1::Text, $2::Text, $3::Text, $4::JSONB, $5::JSONB) RETURNING id;',
        [user.nick, user.email, user.pswHash, JSON.stringify(user.skills), JSON.stringify(user.inventory)]
      );

      // Client.Query returns an object of type pg.Result (https://node-postgres.com/apis/result)
      // Of special intrest is the rows and rowCount properties of this object.

      if (output.rows.length == 1) {
        // We stored the user in the DB.
        user.id = output.rows[0].id;
      }
    } catch (error) {
      console.error(error);
      //TODO : Error handling?? Remember that this is a module seperate from your server
    } finally {
      client.end(); // Always disconnect from the database.
    }
    return user;
  }

  async loginAuthUser(nickInput, passInput) {
    const client = new pg.Client(this.#credentials);
    try {
      await client.connect();
      // const output = await client.query('SELECT "public"."Users"("nick", "password") VALUES($1::Text, $3::Text', [user.nick, user.pswHash]);
      const output = await client.query('SELECT * FROM "public"."Users" WHERE "nick" = $1 AND "password" = $2', [nickInput, passInput]);

      if (output.rows.length > 0) {
        // User exists
        console.log("username and password are correct");
        // console.log(output.rows[0]);
        return output.rows[0]; // return the user
      } else {
        // user does not exist
        console.log("wrong username or password");
        return undefined;
      }
    } catch (error) {
      console.error(error);
      //TODO : Error handling?? Remember that this is a module seperate from your server
    } finally {
      client.end(); // Always disconnect from the database.
    }
    // return user; // token eller noe? idk kanskje i get heller ...
  }
  async getUser(idInput) {
    const client = new pg.Client(this.#credentials);
    try {
      await client.connect();
      // const output = await client.query('SELECT "public"."Users"("nick", "password") VALUES($1::Text, $3::Text', [user.nick, user.pswHash]);
      const output = await client.query('SELECT * FROM "public"."Users" WHERE "id" = $1', [idInput]);
      if (output.rows.length > 0) {
        console.log("user exists");
        // console.log(output.rows[0]);
        return output.rows[0]; // return the user
      } else {
        // user does not exist
        console.log("user does not exist");
        return undefined;
      }
    } catch (error) {
      console.error(error);
      //TODO : Error handling?? Remember that this is a module seperate from your server
    } finally {
      client.end(); // Always disconnect from the database.
    }
    // return user; // token eller noe? idk kanskje i get heller ...
  }
}
export default new DBManager(dbConnectionString);
