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

class items {
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
  setStatsOnItem() {
    switch (this.itemName) {
      case "steelArmor":
        this.lvlReq = 1;
        this.armor = 10;
        break;
      case "runeArmor":
        this.lvlReq = 30;
        this.armor = 40;
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
        this.armor = {
          helms: [],
          shoulders: [],
          chestPlates: [],
          gauntlets: [],
          belt: [],
          legs: [],
          shoes: [],
        };
        break;
      case "Weapons":
        this.weapons = {
          swords: [],
          axes: [],
          maces: [],
          staffs: [],
          bows: [],
        };
        break;
      case "Spells":
        this.spells = {};
        break;
      case "Consumables":
        this.consumables = {};
        break;
      case "Resources":
        this.resources = {};
        break;
    }
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
