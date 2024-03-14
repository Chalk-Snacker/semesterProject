import "dotenv/config";
import crypto from "node:crypto";

export function hashPassword(req, res, next) {
  const userData = req.body;
  console.log("userData.playerNick", userData.playerNick, "userData.playerEmail", userData.playerEmail, "userData.playerPsw", userData.playerPsw);
  if (userData.playerNick == "" || userData.playerEmail == "" || userData.playerPsw == "") {
    res.status(400).json({ success: false, error: "Missing data in input field/s" });
  } else {
    const hash = crypto.createHash("sha256");
    if (userData && userData.playerPsw) {
      hash.update(userData.playerPsw);
      hash.update(process.env.HASH_SALT);

      userData.playerPsw = hash.digest("hex");
    }
    if (userData.updatedUserInformation && userData.updatedUserInformation.newUserName && userData.updatedUserInformation.newUserPassword) {
      hash.update(req.body.updatedUserInformation.newUserPassword);
      hash.update(process.env.HASH_SALT);
      req.body.updatedUserInformation.newUserPassword = hash.digest("hex");
    }
    next();
  }
}
