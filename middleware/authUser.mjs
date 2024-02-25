import pg from "pg";
import { dbConnectionString } from "..//modules/dbConfig.mjs";
import crypto from "node:crypto";

export async function loginAuthUser(req, res, next) {
  const userData = req.body;
  const nickInput = userData.nick;
  const passInput = userData.password;

  const hashedPassword = crypto.createHash("sha256").update(passInput).digest("hex");

  try {
    const client = new pg.Client(dbConnectionString);
    await client.connect();
    const output = await client.query('SELECT * FROM "public"."Users" WHERE "nick" = $1 AND "password" = $2', [nickInput, hashedPassword]);
    client.end();
    if (output.rows.length > 0) {
      // User exists
      console.log("username and password are correct");
      res.status(200).json({ success: true, message: "Login successful", userId: output.rows[0].id });
      next();
    } else {
      // user does not exist
      console.log("wrong username or password");
      res.status(401).json({ success: false, error: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
}
