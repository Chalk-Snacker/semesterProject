import "dotenv/config";
import crypto from "node:crypto";

export function hashPassword(req, res, next) {
  const userData = req.body;
  const hash = crypto.createHash("sha256");
  if (userData && userData.playerPsw) {
    hash.update(userData.playerPsw);
    hash.update(process.env.HASH_SALT);

    userData.playerPsw = hash.digest("hex");
  }
  if (userData.newUserName && userData.newUserPassword) {
    hash.update(req.body.newUserPassword);
    hash.update(process.env.HASH_SALT);
    req.body.newUserPassword = hash.digest("hex");
  }
  next();
}
