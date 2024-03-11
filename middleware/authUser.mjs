import pg from "pg";
import "dotenv/config";
import { dbConnectionString } from "..//modules/dbConfig.mjs";
import crypto from "node:crypto";

export async function loginAuthUser(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ success: false, error: "Unauthorized" });
    return;
  }

  const credentials = Buffer.from(authHeader.split(" ")[1], "base64").toString("utf-8");
  const [nickInput, passInput] = credentials.split(":");

  const hashedPassword = crypto.createHash("sha256").update(passInput).digest("hex");

  try {
    const client = new pg.Client(dbConnectionString);
    await client.connect();
    const output = await client.query('SELECT * FROM "public"."Users" WHERE "nick" = $1 AND "password" = $2', [nickInput, hashedPassword]);
    client.end();

    if (output.rows.length > 0) {
      console.log("username and password are correct");
      res.status(200).json({ success: true, message: "Login successful", userId: output.rows[0].id });
      next();
    } else {
      console.log("wrong username or password");
      res.status(401).json({ success: false, error: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
}
