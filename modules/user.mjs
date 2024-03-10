// import { Skill, Inventory } from "./UserGameData.mjs";
// import DBManager from "./storageManager.mjs";

// class User {
//   constructor() {
//     this.id;
//     this.nick;
//     this.email;
//     this.pswHash;
//     this.skills = {
//       woodcutting: new Skill("Woodcutting"),
//       mining: new Skill("Mining"),
//       fishing: new Skill("Fishing"),
//       cooking: new Skill("Cooking"),
//     };
//     this.inventory = {
//       armor: new Inventory("Armor"),
//       weapon: new Inventory("Weapons"),
//       spell: new Inventory("Spells"),
//       consumable: new Inventory("Consumables"),
//       resource: new Inventory("Resources"),
//     };
//     this.equipped = {
//       helm: null,
//       chestPlate: null,
//       cape: null,
//       gauntlets: null,
//       legs: null,
//       shoes: null,
//       shield: null,
//       weapon: null,
//     };
//   }
//   async save() {
//     /// TODO: What happens if the DBManager fails to complete its task?

//     // We know that if a user object dos not have the ID, then it cant be in the DB.
//     if (this.id == null) {
//       return await DBManager.createUser(this);
//     } else {
//       // return await DBManager.updateUser(this);
//       return;
//     }
//   }
// }

// export default User;

// // chestPlate: null,
// // cape: null,
// // gauntlets: null,
// // legs: null,
// // shoes: null,
// // shield: null,
// // weapon: null,

import { Skill } from "./UserGameData.mjs";
import DBManager from "./storageManager.mjs";

export class User {
  constructor() {
    this.id;
    this.nick;
    this.email;
    this.pswHash;
    this.skills = {
      woodcutting: new Skill("Woodcutting"),
      mining: new Skill("Mining"),
      fishing: new Skill("Fishing"),
      cooking: new Skill("Cooking"),
    };
    this.inventory = {
      // armor: { bronzeSet: {}, ironSet: {}, steelSet: {} },
      // weapon: { bronzeSet: {}, ironSet: {}, steelSet: {} },
      // // spell: new Inventory("Spells"),
      // // consumable: new Inventory("Consumables"),
      // // resource: new Inventory("Resources"),
    };
    this.equipped = {
      helm: null,
      chestPlate: null,
      cape: null,
      gauntlets: null,
      legs: null,
      shoes: null,
      shield: null,
      weapon: null,
    };
  }
  async save() {
    /// TODO: What happens if the DBManager fails to complete its task?

    // We know that if a user object dos not have the ID, then it cant be in the DB.
    if (this.id == null) {
      return await DBManager.createUser(this);
    } else {
      // return await DBManager.updateUser(this);
      return;
    }
  }
}

export const inventory = {
  id: null,
  armor: { bronzeSet: {}, ironSet: {}, steelSet: {} },
  weapon: { bronzeSet: {}, ironSet: {}, steelSet: {} },
  consumables: {},
  resources: {},
};

// weapon: { bronzeSet: {}, ironSet: {}, steelSet: {} },
// // spell: new Inventory("Spells"),
// // consumable: new Inventory("Consumables"),
// // resource: new Inventory("Resources"),

// export default User;

// chestPlate: null,
// cape: null,
// gauntlets: null,
// legs: null,
// shoes: null,
// shield: null,
// weapon: null,
