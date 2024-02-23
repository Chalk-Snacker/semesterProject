import pg from "pg";
import { dbConnectionString } from "./dbConfig.mjs";
import { lvlUp } from "../middleware/lvlUpUser.mjs";

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
}
export default new DBManager(dbConnectionString);
