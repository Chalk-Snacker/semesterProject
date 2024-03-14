import "dotenv/config";
import pg from "pg";
import { dbConnectionString } from "../modules/dbConfig.mjs";

export async function checkIfUserExists(req, res, next, path) {
  const userData = req.body;
  let username,
    password = null;

  if (path === "createUser") {
    username = userData.playerNick;
    password = userData.playerPsw;
  } else if (path === "updateUser") {
    username = userData.updatedUserInformation.newUserName;
    password = userData.updatedUserInformation.newUserPassword;
  } else {
    return res.status(500).json({ success: false, error: "Invalid path" });
  }

  if (username == "" || userData.playerEmail == "" || password == "") {
    return res.status(400).json({ success: false, error: "Missing data in input field/s" });
  }

  try {
    const client = new pg.Client(dbConnectionString);
    await client.connect();
    const existingUser = await client.query('SELECT * FROM  "public"."Users" WHERE "nick" =$1 OR "email" =$2', [username, userData.playerEmail]);
    client.end();
    if (existingUser.rows.length > 0) {
      return res.status(409).json({ success: false, error: "Username or email already exists" });
    }
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
}
