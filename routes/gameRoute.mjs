import express from "express";
import DBmanager from "../modules/storageManager.mjs";
import { createShop } from "../middleware/createShop.mjs";
import { captializeFirstLetter } from "../public/utilities.mjs";

const GAME_API = express.Router();
GAME_API.use(express.json());

GAME_API.get("/profile", createShop, async (req, res, next) => {
  const userId = req.headers.authorization.split(" ")[1];
  try {
    const user = await DBmanager.getUser(userId);
    res.status(200).json({ success: true, message: "fetching successful", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

GAME_API.post("/shop", async (req, res) => {
  const userId = req.headers.authorization.split(" ")[1];
  const item = req.body.item;
  let table = req.originalUrl.split("/");
  table = captializeFirstLetter(table[2]);

  try {
    const userData = await DBmanager.findItem(userId, item, "buy", table);
    res.status(200).json({ success: true, message: "Purchase of item successful", userData });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

GAME_API.put("/xp", async (req, res, next) => {
  const userId = req.headers.authorization.split(" ")[1];
  const skillName = req.body.name;
  const updatedUserXp = req.body.xp;
  try {
    const userData = await DBmanager.updateUserSkils(userId, skillName, updatedUserXp);
    res.status(200).json({ success: true, userData });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

GAME_API.put("/inventory", async (req, res, next) => {
  const userId = req.headers.authorization.split(" ")[1];
  const item = req.body.item;
  let table = req.originalUrl.split("/");
  table = captializeFirstLetter(table[2]);
  try {
    const userData = await DBmanager.findItem(userId, item, "equip", table);
    res.status(200).json({ success: true, message: "Update successful", userData });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

GAME_API.delete("/inventory", async (req, res) => {
  const userId = req.headers.authorization.split(" ")[1];
  const item = req.body.item;
  let table = req.originalUrl.split("/");
  table = captializeFirstLetter(table[2]);

  try {
    await DBmanager.findItem(userId, item, "sell", table);
    res.status(200).json({ success: true, message: "Deletion successful" });
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

GAME_API.get("/inventory", async (req, res) => {
  const userId = req.headers.authorization.split(" ")[1];
  try {
    const inventoryData = await DBmanager.getItemsFromInventory(userId);
    res.status(200).json({ success: true, message: "Retrival successful", inventoryData });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

export default GAME_API;
