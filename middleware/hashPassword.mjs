import crypto from "node:crypto";

export function hashPassword(req, res, next) {
  const userData = req.body;
  if (userData && userData.playerPsw) {
    userData.playerPsw = crypto.createHash("sha256").update(userData.playerPsw).digest("hex");
  }
  if (userData.updatedUserInformation && userData.updatedUserInformation.newUserName && userData.updatedUserInformation.newUserPassword) {
    req.body.updatedUserInformation.newUserPassword = crypto.createHash("sha256").update(req.body.updatedUserInformation.newUserPassword).digest("hex");
  }
  next();
}
