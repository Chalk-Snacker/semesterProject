import express from "express";
// import User from "../modules/user.mjs";
import { users } from "./usersRoute.mjs";

// requests from game.mjs
const GAME_API = express.Router();

// console.log("tesetsetsetsetsetsetstestestestes", users);

GAME_API.get("/", (req, res) => {
  //   console.log("ei lita test");
  //   console.log(User.skills)
  //   res.json(User);
  //   console.log(User);

  res.json(users);
  //   console.log(users);
});

// dont need next for now
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
      console.log("condition met");
      user.restXp = user.xp % user.xpThreshHold[user.lvl];
      user.xp = user.restXp;
      user.restXp = 0;
      user.lvl++;
    }
    res.status(200).json({ success: true, message: "Level xp updated successfully" });
  } else {
    res.status(404).json({ success: false, error: "User or skill not found" });
  }
  console.log(users[0].skills);
});

GAME_API.delete("/:id", (req, res) => {
  //
});

export default GAME_API;
