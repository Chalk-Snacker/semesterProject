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

//export const BronzeStatsStats = {
//   helm: 0,
//   shoulder: 0,
//   chestPlate: 0,
//   gauntlets: 0,
//   belt: 0,
//   legs: 0,
//   shoes: 0,
//   shield: 0,
//   sword: 0,
//   axe: 0,
//   mace: 0,
//   greatSword: 0,
//   greatAxe: 0,
//   greatMace: 0,
//   staff: 0,
//   bow: 0,
// };
// Object.keys(BronzeStats).forEach((stat) => {
//   BronzeStats[stat] = 10;
// });

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
