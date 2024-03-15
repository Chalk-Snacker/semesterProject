import "dotenv/config";
import crypto from "node:crypto";

export function hashPassword(req, res, next) {
  const userData = req.body;
  // trenger jeg å sjekke om feltene er tomme her også når jeg har den nye middleware?
  if (userData.playerNick == "" || userData.playerEmail == "" || userData.playerPsw == "") {
    res.status(400).json({ success: false, error: "Missing data in input field/s" });
  } else {
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
}
