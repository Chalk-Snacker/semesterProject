import express from "express";
import util from "util";
import DBmanager from "../modules/storageManager.mjs";
import { createShop } from "../middleware/createShop.mjs";
import { captializeFirstLetter } from "../public/utilities.mjs";

const GAME_API = express.Router();
GAME_API.use(express.json());

GAME_API.post("/profile", createShop, async (req, res, next) => {
  const user = req.body;

  try {
    const userData = await DBmanager.getUser(user.userId);
    if (userData != undefined) {
      let user = {
        id: userData.id,
        nick: userData.nick,
        skills: userData.skills,
      };
      // res.json({ user });
      res.status(200).json({ success: true, message: "fetching successful", user });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

GAME_API.post("/shop", async (req, res) => {
  const user = req.body.userLoginId;
  const item = req.body.item.itemToBuy;
  let table = req.originalUrl.split("/");
  table = captializeFirstLetter(table[2]);

  try {
    const userData = await DBmanager.findItem(user.userId, item, "buy", table);
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

GAME_API.put("/inventory", async (req, res, next) => {
  const user = req.body.userLoginId;
  const item = req.body.item.equipped;
  let table = req.originalUrl.split("/");
  table = captializeFirstLetter(table[2]);
  try {
    // const userData = await DBmanager.equippedItems(user.userId, item, table);
    const userData = await DBmanager.findItem(user.userId, item, "equip", table);
    res.status(200).json({ success: true, message: "Update successful", userData });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

GAME_API.delete("/inventory", async (req, res) => {
  const user = req.body.userLoginId;
  const item = req.body.item.itemToSell;
  let table = req.originalUrl.split("/");
  table = captializeFirstLetter(table[2]);

  try {
    const userData = await DBmanager.findItem(user.userId, item, "sell", table);
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
