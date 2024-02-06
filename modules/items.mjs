export class BronzeArmor {
  constructor(itemType) {
    switch (itemType) {
      case "helm":
        this.helm = {
          name: "Bronze helmet",
          defense: 5,
          lvlReq: 3,
        };
        break;
      case "chestPlate":
        this.chestPlate = {
          name: "Bronze chestplate",
          defense: 14,
          lvlReq: 3,
        };
        break;
      case "gauntlets":
        this.gauntlets = {
          name: "Bronze gauntlets",
          defense: 2,
          lvlReq: 3,
        };
        break;
      case "legs":
        this.legs = {
          name: "Slacks",
          defense: 7,
          lvlReq: 3,
        };
        break;
      case "shoes":
        this.shoes = {
          name: "Hobo slippers",
          defense: 2,
          lvlReq: 3,
        };
        break;
      case "shield":
        this.sword = {
          name: "Torn umbrella",
          defense: 6,
          lvlReq: 3,
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
        };
        break;
      case "axe":
        this.sword = {
          name: "Bronze axe",
          attack: 12,
          lvlReq: 3,
        };
        break;
      case "mace":
        this.sword = {
          name: "Bronze mace",
          attack: 12,
          lvlReq: 3,
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
  constructor(itemType) {
    // Add a property to store the item type
    this.itemType = itemType;
    this.item = {};

    switch (itemType) {
      case "helm":
        this.item = {
          name: "Dr Pepper cap",
          defense: 1,
          lvlReq: 1,
        };
        break;
      case "chestPlate":
        this.item = {
          name: "League of Legends shirt",
          defense: 99,
          lvlReq: 1,
        };
        break;
      case "cape":
        this.item = {
          name: "bed sheet",
          defense: 1,
          lvlReq: 1,
        };
        break;
      case "gauntlets":
        this.item = {
          name: "disposable gloves",
          defense: 1,
          lvlReq: 1,
        };
        break;
      case "legs":
        this.item = {
          name: "Slacks",
          defense: 1,
          lvlReq: 1,
        };
        break;
      case "shoes":
        this.item = {
          name: "Hobo slippers",
          defense: 1,
          lvlReq: 1,
        };
        break;
      case "shield":
        this.item = {
          name: "Torn umbrella",
          defense: 2,
          lvlReq: 1,
        };
        break;
      case "sword":
        this.item = {
          name: "Homemade wooden butterknife",
          attack: 2,
          lvlReq: 1,
        };
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
