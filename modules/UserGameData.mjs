import { users } from "../routes/usersRoute.mjs";
import { BronzeStats, IronStats, SteelStats, BlackStats, MithrilStats, AdamantStats, RuneStats, Capes } from "./items.mjs";
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

class Item {
  constructor(itemName, itemCategory, itemSlot, itemType) {
    // klasse for å lage alle items
    this.itemName = itemName;
    this.itemCategory = itemCategory;
    this.itemSlot = itemSlot;
    this.lvlReq;
    this.armor;
    this.attack;
    this.itemSlot = itemSlot;

    if (itemType == "bronze" && itemCategory == "armor") {
      this.lvlReq = BronzeStats.lvlReq;
      this.armor = BronzeStats.armor[itemSlot];
    } else if (itemType == "bronze" && itemCategory == "weapon") {
      this.lvlReq = BronzeStats.lvlReq;
      this.attack = BronzeStats.weapon[itemSlot];
    } else if (itemType == "iron" && itemCategory == "armor") {
      this.lvlReq = IronStats.lvlReq;
      this.armor = IronStats.armor[itemSlot];
    } else if (itemType == "iron" && itemCategory == "weapon") {
      this.lvlReq = IronStats.lvlReq;
      this.attack = IronStats.weapon[itemSlot];
    } else if (itemType == "steel" && itemCategory == "armor") {
      this.lvlReq = SteelStats.lvlReq;
      this.armor = SteelStats.armor[itemSlot];
    } else if (itemType == "steel" && itemCategory == "weapon") {
      this.lvlReq = SteelStats.lvlReq;
      this.attack = SteelStats.weapon[itemSlot];
    } else if (itemType == "black" && itemCategory == "armor") {
      this.lvlReq = BlackStats.lvlReq;
      this.armor = BlackStats.armor[itemSlot];
    } else if (itemType == "black" && itemCategory == "weapon") {
      this.lvlReq = BlackStats.lvlReq;
      this.attack = BlackStats.weapon[itemSlot];
    } else if (itemType == "mithril" && itemCategory == "armor") {
      this.lvlReq = MithrilStats.lvlReq;
      this.armor = MithrilStats.armor[itemSlot];
    } else if (itemType == "mithril" && itemCategory == "weapon") {
      this.lvlReq = MithrilStats.lvlReq;
      this.attack = MithrilStats.weapon[itemSlot];
    } else if (itemType == "adamant" && itemCategory == "armor") {
      this.lvlReq = AdamantStats.lvlReq;
      this.armor = AdamantStats.armor[itemSlot];
    } else if (itemType == "adamant" && itemCategory == "weapon") {
      this.lvlReq = AdamantStats.lvlReq;
      this.attack = AdamantStats.weapon[itemSlot];
    } else if (itemType == "rune" && itemCategory == "armor") {
      this.lvlReq = RuneStats.lvlReq;
      this.armor = RuneStats.armor[itemSlot];
    } else if (itemType == "rune" && itemCategory == "weapon") {
      this.lvlReq = RuneStats.lvlReq;
      this.attack = RuneStats.weapon[itemSlot];
    }
  }
}

export class Inventory {
  constructor(inventoryCategory) {
    this.inventoryCategory = inventoryCategory;
    // lag noen default items nye spillere starter med
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
        // this.helms.push(new Item("Starting helmet", "armor", "helm", "bronze"));
        // this.chestPlates.push(new Item("Starting chestPlates", "armor", "chestPlate", "bronze"));
        // this.gauntlets.push(new Item("Starting gauntlets", "armor", "gauntlets", "bronze"));
        // this.legs.push(new Item("Starting legs", "armor", "legs", "bronze"));
        // this.shoes.push(new Item("Starting shoes", "armor", "shoes", "bronze"));
        // // this.cape.push(new Item("Starting cape", "armor", "cape"));
        // this.shield.push(new Item("Starting shield", "armor", "shield", "bronze"));
        break;
      case "weapons":
        this.swords.push(new Item("Starting sword", "weapon", "sword", "bronze"));
        this.axes.push(new Item("Starting axe", "weapon", "axe", "bronze"));
        this.maces.push(new Item("Starting mace", "weapon", "mace", "bronze"));
        this.staffs.push(new Item("old ass walking stick", "weapon", "staff", "bronze"));
        this.bows.push(new Item("Dennis the menace's slingshot", "weapon", "bow", "bronze"));
        // console.log(this.swords);
        break;
      case "spells":
        this.fire.push(new Item("shitty flame", "spell", "1-hand")); // 1-hand or spell??
        break;
      case "consumables":
        this.healingPotions.push(new Item("soyPot", "consumable", "itemSlot"));
        break;
    }
  }
  addNewItem() {
    // this.helms.push(new Item("Starting helmet", "armor", "head"));
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
