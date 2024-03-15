import express from "express";
import DBmanager from "../modules/storageManager.mjs";
import "dotenv/config";
import { hashPassword } from "../middleware/hashPassword.mjs";
import { loginAuthUser } from "../middleware/authUser.mjs";
import { checkIfUserExists } from "../middleware/checkIfUserExists.mjs";
import { User } from "../modules/user.mjs";

const USER_API = express.Router();
USER_API.use(express.json());

USER_API.post(
  "/",
  hashPassword,
  (req, res, next) => checkIfUserExists(req, res, next, "createUser"),
  async (req, res) => {
    const userData = req.body;

    const user = new User(userData.playerNick, userData.playerEmail, userData.playerPsw);
    await DBmanager.createUser(user);
    res.status(201).json({ success: true, user });
  }
);

USER_API.get("/login", loginAuthUser, (req, res) => {}); // get??

USER_API.put(
  "/usrPsw",
  hashPassword,
  (req, res, next) => checkIfUserExists(req, res, next, "updateUser"),
  async (req, res) => {
    const userId = req.headers.authorization.split(" ")[1];

    const userData = req.body;
    // const user = userData.userLoginId.userId;
    // const updatedUserNick = userData.updatedUserInformation.newUserName.newUserName;
    const updatedUserNick = userData.newUserName;
    await DBmanager.updateUserInformation(userId, updatedUserNick, userData.newUserPassword);
    // await DBmanager.updateUserInformation(userId, updatedUserNick, userData.updatedUserInformation.newUserPassword.newUserPassword);
    res.status(200).json({ success: true });
  }
);

USER_API.delete("/", async (req, res) => {
  // const user = req.body;
  const userId = req.headers.authorization.split(" ")[1];
  try {
    await DBmanager.deleteUser(userId);
    res.status(200).json({ success: true, message: " User deleted" });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

export default USER_API;
