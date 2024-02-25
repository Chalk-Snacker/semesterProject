import express from "express";
import User from "../modules/user.mjs";
import DBmanager from "../modules/storageManager.mjs";
import "dotenv/config";
import { hashPassword } from "../middleware/hashPassword.mjs";
import { loginAuthUser } from "../middleware/authUser.mjs";

const USER_API = express.Router();
USER_API.use(express.json());

USER_API.get("/:", (req, res) => {
  // Return user object
});

// dont need next for now
USER_API.post("/", hashPassword, async (req, res) => {
  const userData = req.body;

  if (userData.playerNick != "" && userData.playerEmail != "" && userData.playerPsw != "") {
    let user = new User();
    ///TODO: Do not save passwords.

    user.nick = userData.playerNick;
    user.email = userData.playerEmail;
    user.pswHash = userData.playerPsw;

    user.inventory.armor.createStartingItems("armor");
    user.inventory.weapons.createStartingItems("weapons");
    user.inventory.spells.createStartingItems("spells");
    user.inventory.consumables.createStartingItems("consumables");

    ///TODO: Does the user exist?
    let exists = false;

    if (!exists) {
      //TODO: What happens if this fails?
      user = await user.save();
      console.log("asdf");
      res.status(201).json(JSON.stringify(user)).end();
    } else {
      console.log("fdsa");
      res.status(400).end();
    }
  } else {
    res.status(400).send("Mangler data felt").end();
  }
});

USER_API.post("/login", loginAuthUser, async (req, res) => {
  // asdf
});

USER_API.put("/usrPsw", hashPassword, async (req, res) => {
  const userData = req.body;

  const user = userData.userLoginId.userId;
  const updatedUserNick = userData.updatedUserInformation.newUserName;
  const updatedUserPassword = userData.updatedUserInformation.newUserPassword;

  try {
    const userData = await DBmanager.updateUserInformation(user, updatedUserNick, updatedUserPassword);
    res.status(200).json({ success: true, userData });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

USER_API.delete("/", async (req, res) => {
  const user = req.body;

  try {
    await DBmanager.deleteUser(user);
    res.status(200).json({ success: true, message: " User deleted" });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

export default USER_API;
