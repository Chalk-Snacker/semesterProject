import express from "express";
import { users } from "./usersRoute.mjs";
import util from "util";

// requests from game.mjs
const GAME_API = express.Router();
users[0].inventory.armor.createStartingItems("armor");
users[0].inventory.weapons.createStartingItems("weapons");
users[0].inventory.spells.createStartingItems("spells");
users[0].inventory.consumables.createStartingItems("consumables");

const inventory = users[0].inventory;
const test = JSON.parse(JSON.stringify(inventory));
const armorCategories = Object.keys(test);

for (let i = 0; i < armorCategories.length; i++) {
  const category = armorCategories[i];
  const items = users[0].inventory[category];

  // Check if the category has items
  const itemKeys = Object.keys(items);

  if (itemKeys.length > 0) {
    for (let j = 0; j < itemKeys.length; j++) {
      const itemType = itemKeys[j];
      const itemInstances = items[itemType];

      // Check if the item type array is not empty
      if (itemInstances.length > 0) {
        for (let k = 0; k < itemInstances.length; k++) {
          const itemInstance = itemInstances[k];

          // Check if itemInstance is an object before logging and if it hasn't been logged
          if (typeof itemInstance === "object" && itemInstance !== null && !itemInstance.logged) {
            console.log(`Item instance: `, itemInstance);

            // Mark item as logged
            itemInstance.logged = true;

            // Here you can access the path like users[0].inventory.armor.helms[0]
            const path = `users[0].inventory.${category}.${itemType}[${k}]`;
            const itemAtPath = eval(path);
          }
        }
      }
    }
  }
}

// console.log("User starting items: ", users[0].inventory);
// console.log("Armor: ", users[0].inventory.armor.helms[0]);
// console.log("Weapons: ", users[0].inventory.weapons.swords[0]);
// console.log("Spells: ", users[0].inventory.spells.fire[0]);
// console.log("Consumables: ", users[0].inventory.consumables.healingPotions[0]);
// lage en logger for å se alle items bruker har, inkl. stats, navn ++ og i forskjellige farger irhold til type (armor, weapon, potion, spell)
GAME_API.get("/", (req, res) => {
  res.json(users);
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
      users[0].skills[skillName].lvlUp();
    }
    res.status(200).json({ success: true, message: "Level xp updated successfully" });
  } else {
    res.status(404).json({ success: false, error: "User or skill not found" });
  }

  const { xpThreshHold, ...userSkills } = user;
  console.log(userSkills);
});

GAME_API.delete("/:id", (req, res) => {
  //
});

export default GAME_API;
