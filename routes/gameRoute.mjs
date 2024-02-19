import express from "express";
import { users } from "./usersRoute.mjs";
import util from "util";
import UserGameDataLogger from "../modules/UserGameDataLogger.mjs";

// requests from game.mjs
const GAME_API = express.Router();
// users[0].inventory.armor.createStartingItems("armor");
// users[0].inventory.weapons.createStartingItems("weapons");
// users[0].inventory.spells.createStartingItems("spells");
// users[0].inventory.consumables.createStartingItems("consumables");
// kommenterer disse for å teste uten user[0]

GAME_API.put("/:id", (req, res, next) => {
  UserGameDataLogger.logInventory(users[0]);
  next();
});

GAME_API.get("/", (req, res) => {
  res.json(users);
});

GAME_API.post("/", (req, res) => {
  //
});

GAME_API.put("/:id", (req, res) => {
  const skillName = req.params.id;
  const updatedUserData = req.body;
  const user = users[0].skills[skillName];
  if (users[0].skills && users[0].skills[skillName] && users[0].skills[skillName].xp !== undefined) {
    users[0].skills[skillName].xp = updatedUserData[skillName].xp;
    if (user.xp >= user.xpThreshHold[user.lvl]) {
      users[0].skills[skillName].lvlUp();
    }
    res.status(200).json({ success: true, message: "Level xp updated successfully" });
  } else {
    res.status(404).json({ success: false, error: "User or skill not found" });
  }

  const { xpThreshHold, restXp, ...userSkills } = user;
  // console.log(userSkills);
});

GAME_API.delete("/:id", (req, res) => {
  //
});

export default GAME_API;
