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
  constructor(itemName, itemCategory, itemSlot) {
    // klasse for å lage alle items
    this.itemName = itemName;
    this.itemCategory = itemCategory;
    this.itemSlot = itemSlot;
    this.lvlReq;
    this.armor;
    this.attack;
  }

  // kjør den i route?
  setStatsOnItem(itemType, itemCategory, itemSlot) {
    switch (itemType && itemCategory) {
      case itemType == "bronze" && itemCategory == "armor":
        this.lvlReq = BronzeStats.lvlReq;
        this.armor = BronzeStats.armor.itemSlot;
        break;

      case itemType == "bronze" && itemCategory == "weapon":
        this.lvlReq = BronzeStats.lvlReq;
        this.attack = BronzeStats.weapon.itemSlot;
        break;

      case itemType == "iron" && itemCategory == "armor":
        this.lvlReq = 1;
        this.armor = IronStats.armor.itemSlot;
        break;

      case itemType == "iron" && itemCategory == "weapon":
        this.lvlReq = 1;
        this.attack = IronStats.weapon.itemSlot;
        break;

      case itemType == "steel" && itemCategory == "armor":
        this.lvlReq = 1;
        this.armor = SteelStats.armor.itemSlot;
        break;

      case itemType == "steel" && itemCategory == "weapon":
        this.lvlReq = 1;
        this.attack = SteelStats.weapon.itemSlot;
        break;

      case itemType == "black" && itemCategory == "armor":
        this.lvlReq = 1;
        this.armor = BlackStats.armor.itemSlot;
        break;

      case itemType == "black" && itemCategory == "weapon":
        this.lvlReq = 1;
        this.attack = BlackStats.weapon.itemSlot;
        break;

      case itemType == "mithril" && itemCategory == "armor":
        this.lvlReq = 1;
        this.armor = MithrilStats.armor.itemSlot;
        break;

      case itemType == "mithril" && itemCategory == "weapon":
        this.lvlReq = 1;
        this.attack = MithrilStats.weapon.itemSlot;
        break;

      case itemType == "adamant" && itemCategory == "armor":
        this.lvlReq = 1;
        this.armor = AdamantStats.armor.itemSlot;
        break;

      case itemType == "adamant" && itemCategory == "weapon":
        this.lvlReq = 1;
        this.attack = AdamantStats.weapon.itemSlot;
        break;
      case itemType == "rune" && itemCategory == "armor":
        this.lvlReq = 1;
        this.armor = RuneStats.armor.itemSlot;
        break;

      case itemType == "rune" && itemCategory == "weapon":
        this.lvlReq = 1;
        this.attack = RuneStats.weapon.itemSlot;
        break;
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
        this.helms.push(new Item("Starting helmet", "armor", "head"));
        this.chestPlates.push(new Item("Starting chestPlates", "armor", "chest"));
        this.gauntlets.push(new Item("Starting gauntlets", "armor", "hands"));
        this.legs.push(new Item("Starting legs", "armor", "legs"));
        this.shoes.push(new Item("Starting shoes", "armor", "feet"));
        // this.cape.push(new Item("Starting cape", "armor", "back"));
        this.shield.push(new Item("Starting shield", "armor", "off-hand"));
        break;
      case "weapons":
        this.swords.push(new Item("Starting sword", "weapon", "1-hand"));
        this.axes.push(new Item("Starting axe", "weapon", "1-hand"));
        this.maces.push(new Item("Starting mace", "weapon", "1-hand"));
        this.staffs.push(new Item("old ass walking stick", "weapon", "1-hand"));
        this.bows.push(new Item("Dennis the menace's slingshot", "weapon", "1-hand"));

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
