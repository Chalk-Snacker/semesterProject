export class BronzeArmor {
  constructor(itemSlot) {
    switch (itemSlot) {
      case "helm":
        this.helm = {
          name: "Bronze helmet",
          defense: 5,
          lvlReq: 3,
          itemCategory: "armor",
        };
        break;
      case "chestPlate":
        this.chestPlate = {
          name: "Bronze chestplate",
          defense: 14,
          lvlReq: 3,
          itemCategory: "armor",
        };
        break;
      case "gauntlets":
        this.gauntlets = {
          name: "Bronze gauntlets",
          defense: 2,
          lvlReq: 3,
          itemCategory: "armor",
        };
        break;
      case "legs":
        this.legs = {
          name: "Slacks",
          defense: 7,
          lvlReq: 3,
          itemCategory: "armor",
        };
        break;
      case "shoes":
        this.shoes = {
          name: "Hobo slippers",
          defense: 2,
          lvlReq: 3,
          itemCategory: "armor",
        };
        break;
      case "shield":
        this.sword = {
          name: "Torn umbrella",
          defense: 6,
          lvlReq: 3,
          itemCategory: "armor",
        };
        break;
    }
  }
}

export class BronzeWeapons {
  constructor(weaponType) {
    switch (weaponType) {
      case "sword":
        this.sword = {
          name: "Bronze sword",
          attack: 12,
          lvlReq: 3,
          itemCategory: "weapon",
        };
        break;
      case "axe":
        this.axe = {
          name: "Bronze axe",
          attack: 12,
          lvlReq: 3,
          itemCategory: "weapon",
        };
        break;
      case "mace":
        this.mace = {
          name: "Bronze mace",
          attack: 12,
          lvlReq: 3,
          itemCategory: "weapon",
        };
        break;
    }
  }
}

export class LegendaryItems {
  constructor(aLegendary) {
    switch (aLegendary) {
      case "magicFunCloth":
        // add drop rate?
        this.cape = {
          name: "magicFunCloth",
          defense: 48,
          lvlReq: 32,
          itemCategory: "armor",
        };
        break;
      case "addNewLego..":
        // this.cape = {
        //   name: "magicFunCloth",
        //   defense: 48,
        //   lvlReq: 32,
        // };
        break;
    }
  }
}
export const shopArmorSet = {
  bronzeSet: {
    helm: { name: "BronzeHelm", defense: 10, lvlReq: 3, itemCategory: "armor", price: 0, info: "Very cool item" },
    shoulder: { name: "Bronze shoudlers", defense: 10, lvlReq: 3, itemCategory: "armor", price: 0, info: "Very cool item" },
    chestPlate: { name: "Bronze chestplate", defense: 10, lvlReq: 3, itemCategory: "armor", price: 0, info: "Very cool item" },
    gauntlets: { name: "Bronze gauntlets", defense: 10, lvlReq: 3, itemCategory: "armor", price: 0, info: "Very cool item" },
    legs: { name: "Bronze legs", defense: 10, lvlReq: 3, itemCategory: "armor", price: 0, info: "Very cool item" },
    shoes: { name: "Bronze shoes", defense: 10, lvlReq: 3, itemCategory: "armor", price: 0, info: "Very cool item" },
    shield: { name: "Bronze shield", defense: 20, lvlReq: 3, itemCategory: "armor", price: 0, info: "Very cool item" },
  },
  ironSet: {
    helm: { name: "Iron helm", defense: 23, lvlReq: 7, itemCategory: "armor", price: 0, info: "Even cooler item!" },
    shoulder: { name: "Iron shouldesr", defense: 23, lvlReq: 7, itemCategory: "armor", price: 0, info: "Even cooler item!" },
    chestPlate: { name: "Iron chestplate", defense: 23, lvlReq: 7, itemCategory: "armor", price: 0, info: "Even cooler item!" },
    gauntlets: { name: "Iron gauntlets", defense: 23, lvlReq: 7, itemCategory: "armor", price: 0, info: "Even cooler item!" },
    legs: { name: "Iron legs", defense: 23, lvlReq: 7, itemCategory: "armor", price: 0, info: "Even cooler item!" },
    shoes: { name: "Iron shoes", defense: 23, lvlReq: 7, itemCategory: "armor", price: 0, info: "Even cooler item!" },
    shield: { name: "Iron shield", defense: 46, lvlReq: 7, itemCategory: "armor", price: 0, info: "Even cooler item!" },
  },
  steelSet: {
    helm: { name: "Steel helm", defense: 39, lvlReq: 12, itemCategory: "armor", price: 0, info: "Based item" },
    shoulder: { name: "Steel shoulder", defense: 39, lvlReq: 12, itemCategory: "armor", price: 0, info: "Based item" },
    chestPlate: { name: "Steel chestplate", defense: 39, lvlReq: 12, itemCategory: "armor", price: 0, info: "Based item" },
    gauntlets: { name: "Steel gauntlets", defense: 39, lvlReq: 12, itemCategory: "armor", price: 0, info: "Based item" },
    legs: { name: "Steel legs", defense: 39, lvlReq: 12, itemCategory: "armor", price: 0, info: "Based item" },
    shoes: { name: "Steel shoes", defense: 39, lvlReq: 12, itemCategory: "armor", price: 0, info: "Based item" },
    shield: { name: "Steel shield", defense: 78, lvlReq: 12, itemCategory: "armor", price: 0, info: "Based item" },
  },
};
export const shopWeaponSet = {
  bronzeSet: {
    sword: { name: "Bronze sword", attack: 17, lvlReq: 3, itemCategory: "weapon", price: 0, info: "Very cool item" },
    axe: { name: "Bronze axe", attack: 17, lvlReq: 3, itemCategory: "weapon", price: 0, info: "Very cool item" },
    mace: { name: "Bronze maze", attack: 17, lvlReq: 3, itemCategory: "weapon", price: 0, info: "Very cool item" },
    greatSword: { name: "Bronze greatsword", attack: 28, lvlReq: 3, itemCategory: "weapon", price: 0, info: "Very cool item" },
    greatAxe: { name: "Bronze greataxe", attack: 28, lvlReq: 3, itemCategory: "weapon", price: 0, info: "Very cool item" },
    greatMace: { name: "Bronze greatmace", attack: 28, lvlReq: 3, itemCategory: "weapon", price: 0, info: "Very cool item" },
  },
  ironSet: {
    sword: { name: "Iron sword", attack: 36, lvlReq: 7, itemCategory: "weapon", price: 0, info: "Even cooler item!" },
    axe: { name: "Iron axe", attack: 36, lvlReq: 7, itemCategory: "weapon", price: 0, info: "Even cooler item!" },
    mace: { name: "Iron maze", attack: 36, lvlReq: 7, itemCategory: "weapon", price: 0, info: "Even cooler item!" },
    greatSword: { name: "Iron greatsword", attack: 52, lvlReq: 7, itemCategory: "weapon", price: 0, info: "Even cooler item!" },
    greatAxe: { name: "Iron greataxe", attack: 52, lvlReq: 7, itemCategory: "weapon", price: 0, info: "Even cooler item!" },
    greatMace: { name: "Iron greatmace", attack: 52, lvlReq: 7, itemCategory: "weapon", price: 0, info: "Even cooler item!" },
  },
  steelSet: {
    sword: { name: "Steel sword", attack: 54, lvlReq: 12, itemCategory: "weapon", price: 0, info: "Based item" },
    axe: { name: "Steel axe", attack: 54, lvlReq: 12, itemCategory: "weapon", price: 0, info: "Based item" },
    mace: { name: "Steel maze", attack: 54, lvlReq: 12, itemCategory: "weapon", price: 0, info: "Based item" },
    greatSword: { name: "Steel greatsword", attack: 72, lvlReq: 12, itemCategory: "weapon", price: 0, info: "Based item" },
    greatAxe: { name: "Steel greataxe", attack: 72, lvlReq: 12, itemCategory: "weapon", price: 0, info: "Based item" },
    greatMace: { name: "Steel greatmace", attack: 72, lvlReq: 12, itemCategory: "weapon", price: 0, info: "Based item" },
  },
};

// staff: { name: "bronzeHelm", defense: "10", lvlReq: "6", itemCategory: "armor" },
// flimseyBow: { name: "bronzeHelm", defense: "10", lvlReq: "6", itemCategory: "armor" },
// fjern starting items og legg de i shoppen?

// gi items navn og alt annet i klassen så du ikke må parse inn 100 parametere som det er nå
export class StartingItems {
  constructor(itemSlot) {
    // Add a property to store the item type
    this.itemSlot = itemSlot;
    this.name;
    this.defense;
    this.lvlReq;
    this.itemCategory;

    switch (itemSlot) {
      case "helm":
        this.name = "Dr Pepper cap";
        this.defense = 1;
        this.lvlReq = 1;
        this.itemCategory = "armor";
        break;
      case "chestPlate":
        this.name = "League of Legends shirt";
        this.defense = 99;
        this.lvlReq = 1;
        this.itemCategory = "armor";
        break;
      case "cape":
        this.name = "bed sheet";
        this.defense = 1;
        this.lvlReq = 1;
        this.itemCategory = "armor";
        break;
      case "gauntlets":
        this.name = "disposable gloves";
        this.defense = 1;
        this.lvlReq = 1;
        this.itemCategory = "armor";
        break;
      case "legs":
        this.name = "Slacks";
        this.defense = 1;
        this.lvlReq = 1;
        this.itemCategory = "armor";
        break;
      case "shoes":
        this.name = "Hobo slippers";
        this.defense = 1;
        this.lvlReq = 1;
        this.itemCategory = "armor";
        break;
      case "shield":
        this.name = "Torn umbrella";
        this.defense = 2;
        this.lvlReq = 1;
        this.itemCategory = "armor";
        break;
      case "sword":
        this.name = "Homemade wooden butterknife";
        this.attack = 2;
        this.lvlReq = 1;
        this.itemCategory = "weapon";

        break;
    }
  }
}

export class Spells {
  constructor(spellType) {
    switch (spellType) {
      case "fire":
        this.spell = {
          name: "Shitty flame",
          magic: 4,
          lvlReq: 1,
        };
        break;
    }
  }
}

export class Consumables {
  constructor(consumableType) {
    switch (consumableType) {
      case "healingPotion":
        this.potion = {
          name: "Soy pot",
          healing: 3,
          lvlReq: 1,
        };
        break;
    }
  }
}
