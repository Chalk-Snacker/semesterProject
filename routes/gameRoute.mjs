import express from "express";
import util from "util";
// import UserGameDataLogger from "../modules/UserGameDataLogger.mjs";
import DBmanager from "../modules/storageManager.mjs";
import { createShop } from "../middleware/createShop.mjs";

// requests from game.mjs
const GAME_API = express.Router();
GAME_API.use(express.json());

// GAME_API.put("/:id", (req, res, next) => {
//   // UserGameDataLogger.logInventory(users[0]);
//   next();
// });

GAME_API.post("/profile", createShop, async (req, res, next) => {
  const user = req.body;

  try {
    const userData = await DBmanager.getUser(user.userId);
    if (userData != undefined) {
      let user = {
        id: userData.id,
        nick: userData.nick,
        skills: userData.skills,
        inventory: userData.inventory,
        equipped: userData.equipped,
      };
      // res.json({ user });
      res.status(200).json({ success: true, message: "fetching successful", user });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

// GAME_API.post("/", (req, res) => {
//   //
// });

GAME_API.post("/shop", async (req, res) => {
  const user = req.body.userLoginId;
  const item = req.body.item.itemToBuy;
  console.log(typeof item, item);

  try {
    const userData = await DBmanager.buyItem(user.userId, item);
    res.status(200).json({ success: true, message: "Purchase of item successful", userData });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

GAME_API.put("/xp", async (req, res, next) => {
  const user = req.body.userLoginId;
  const skillName = req.body.updatedSkillXp.name;
  const updatedUserXp = req.body.updatedSkillXp.xp;

  try {
    const userData = await DBmanager.updateUserSkils(user.userId, skillName, updatedUserXp);
    res.status(200).json({ success: true, userData });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

GAME_API.put("/item", async (req, res, next) => {
  const user = req.body.userLoginId;
  const item = req.body.item.equipped;

  try {
    const userData = await DBmanager.equippedItems(user.userId, item);
    res.status(200).json({ success: true, message: "Update successful", userData });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

GAME_API.delete("/item", async (req, res) => {
  const user = req.body.userLoginId;
  const item = req.body.item.itemToSell;
  try {
    const userData = await DBmanager.sellItem(user.userId, item);
    res.status(204).json({ success: true, message: "Deletion successful", userData });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

GAME_API.get("/shop", async (req, res) => {
  try {
    const shopData = await DBmanager.getItemsFromShop();
    res.status(200).json({ success: true, message: "Retrival successful", shopData });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

GAME_API.post("/inventory", async (req, res) => {
  const user = req.body;
  try {
    const inventoryData = await DBmanager.getItemsFromInventory(user.userId);
    res.status(200).json({ success: true, message: "Retrival successful", inventoryData });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

export default GAME_API;
