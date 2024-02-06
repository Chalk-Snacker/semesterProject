import { users } from "../routes/usersRoute.mjs";
import { StartingItems, Spells, Consumables, BronzeArmor, BronzeWeapons, LegendaryItems } from "./items.mjs";
export class Skill {
  constructor(skillName) {
    this.skillName = skillName;
    this.lvl = 1;
    this.xp = 0;
    this.xpThreshHold = {};
    this.restXp = 0; // when lvl up, remaining xp will be tranfered towards next lvl
    for (let i = 0; i < 100; i++) {
      this.xpThreshHold[i] = 50 * i;
    }
  }
  lvlUp() {
    console.log("condition met");
    this.restXp = this.xp % this.xpThreshHold[this.lvl];
    this.xp = this.restXp;
    this.restXp = 0;
    this.lvl++;
  }
}

export class Inventory {
  constructor(inventoryCategory) {
    this.inventoryCategory = inventoryCategory;
    switch (inventoryCategory) {
      case "Armor":
        (this.helms = []), (this.chestPlates = []), (this.cape = []), (this.gauntlets = []), (this.legs = []), (this.shoes = []), (this.shield = []);
        break;
      case "Weapons":
        (this.swords = []),
          (this.axes = []),
          (this.maces = []),
          (this.greatSword = []),
          (this.greatAxe = []),
          (this.greatMace = []),
          (this.staffs = []),
          (this.bows = []);
        break;

      case "Spells":
        (this.holy = []), (this.fire = []), (this.ice = []), (this.shadow = []);
        break;
      case "Consumables":
        (this.healingPotions = []), (this.xpPotion = []);
        break;
      case "Resources":
        (this.fish = []), (this.logs = []), (this.ore = []), (this.food = []);
        break;
    }
  }

  createStartingItems(itemType) {
    switch (itemType) {
      case "armor":
        this.helms.push(new StartingItems("helm"));
        // this.helms.push(new BronzeArmor("helm"));
        this.chestPlates.push(new StartingItems("chestPlate"));
        this.cape.push(new StartingItems("cape"));
        this.gauntlets.push(new StartingItems("gauntlets"));
        this.legs.push(new StartingItems("legs"));
        this.shoes.push(new StartingItems("shoes"));
        this.shield.push(new StartingItems("shield"));
        break;
      case "weapons":
        this.swords.push(new StartingItems("sword"));
        break;
      case "spells":
        this.fire.push(new Spells("fire"));
        break;
      case "consumables":
        this.healingPotions.push(new Consumables("healingPotion"));
        break;
    }
  }
  addNewItem() {
    //asdf
  }
}
class Shop {
  constructor(ItemType) {
    // items player can buy for gold
    this.ItemType = ItemType;
    this.armor = {
      helms: [],
      shoulders: [],
      chestPlates: [],
      gauntlets: [],
      belt: [],
      legs: [],
      shoes: [],
    };
    this.weapons = {
      swords: [],
      axes: [],
      maces: [],
      staffs: [],
      bows: [],
    };
    this.spells = {};
    this.consumables = {};
    this.resources = {};
  }
}
