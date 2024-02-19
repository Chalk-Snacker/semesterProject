import pg from "pg";
import { dbConnectionString } from "./dbConfig.mjs";

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

  // delete og update i caps?

  async updateUser(user) {
    const client = new pg.Client(this.#credentials);

    try {
      await client.connect();
      const output = await client.query('Update "public"."Users" set "name" = $1, "email" = $2, "password" = $3 where id = $4;', [
        user.name,
        user.email,
        user.pswHash,
        user.id,
      ]);
      // Client.Query returns an object of type pg.Result (https://node-postgres.com/apis/result)
      // Of special intrest is the rows and rowCount properties of this object.

      //TODO Did we update the user?
    } catch (error) {
      //TODO : Error handling?? Remember that this is a module seperate from your server
    } finally {
      client.end(); // Always disconnect from the database.
    }

    return user;
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

  async userLoginAuth(nickInput, passInput) {
    const client = new pg.Client(this.#credentials);
    try {
      await client.connect();
      // const output = await client.query('SELECT "public"."Users"("nick", "password") VALUES($1::Text, $3::Text', [user.nick, user.pswHash]);
      const output = await client.query('SELECT "nick" FROM "public"."Users" WHERE "nick" = $1 AND "password" = $2', [nickInput, passInput]);

      if (output.rows.length > 0) {
        // User exists
        console.log("based");
      } else {
        // user does not exist
        console.log("fuck");
      }
    } catch (error) {
      console.error(error);
      //TODO : Error handling?? Remember that this is a module seperate from your server
    } finally {
      client.end(); // Always disconnect from the database.
    }
    // return user; // token eller noe? idk kanskje i get heller ...
  }

  // ------------------------------------------------
}
export default new DBManager(dbConnectionString);
