import express from "express";
import util from "util";
import UserGameDataLogger from "../modules/UserGameDataLogger.mjs";
import DBmanager from "../modules/storageManager.mjs";

// requests from game.mjs
const GAME_API = express.Router();
GAME_API.use(express.json());

GAME_API.put("/:id", (req, res, next) => {
  // UserGameDataLogger.logInventory(users[0]);
  next();
});

// ------------------------ GAMMEL ------------------------
// GAME_API.get("/", (req, res) => {
//   res.json(users);
// });
// ---------------------------------------------------------------

// GAME_API.get("/profile", (req, res) => {
//   res.json({ user: loggedInUser });
//   // middleware/ storageManager for å finne riktig bruker utifra id/email
// });

GAME_API.post("/profile", async (req, res, next) => {
  const user = req.body;
  // console.log("LKADSHFKJASBHDFØKLAJNFGKLJBASDLKFJHASFGJLHABDJKFHASKDLJFHAKSJLDHFKJLASHDFKJLH", userId);

  try {
    const userData = await DBmanager.getUser(user.userId);
    if (userData != undefined) {
      let user = {
        id: userData.id,
        nick: userData.nick,
        skills: userData.skills,
        inventory: userData.inventory,
      };
      // res.json({ user });
      res.status(200).json({ success: true, message: "fetching successful", user });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

GAME_API.post("/", (req, res) => {
  //
});

GAME_API.put("/:id", async (req, res) => {
  const user = req.body.userLoginId;
  const skillName = req.params.id;
  const updatedUserXp = req.body.updatedSkillXp[skillName].xp;
  // console.log(skillName, ": ", "xp:", updatedUserXp, " user id:", user.userId);
  try {
    const userData = await DBmanager.updateUserSkils(user.userId, skillName, updatedUserXp);
    // console.log("nå har det blitt en lang dag", userData);
    res.status(200).json({ success: true, userData });
    // const userData = await DBmanager.getUser(user.userLoginId);
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
    // returner en status på success, ikke noe data siden det hentes fra userData
  }
  // const user = users[0].skills[skillName];
  // if (users[0].skills && users[0].skills[skillName] && users[0].skills[skillName].xp !== undefined) {
  //   users[0].skills[skillName].xp = updatedUserData[skillName].xp;
  //   if (user.xp >= user.xpThreshHold[user.lvl]) {
  // users[0].skills[skillName].lvlUp();
  //   }
  //   res.status(200).json({ success: true, message: "Level xp updated successfully" });
  // } else {
  //   res.status(404).json({ success: false, error: "User or skill not found" });
  // }

  // const { xpThreshHold, restXp, ...userSkills } = user;
  // console.log(userSkills);
});

GAME_API.delete("/:id", (req, res) => {
  //
});

export default GAME_API;
