import { Skill, Inventory } from "./UserGameData.mjs";
import DBManager from "./storageManager.mjs";

class User {
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
      armor: new Inventory("Armor"),
      weapons: new Inventory("Weapons"),
      spells: new Inventory("Spells"),
      consumables: new Inventory("Consumables"),
      resources: new Inventory("Resources"),
    };
    this.equipped = {
      helmet: null,
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

export default User;

// chestPlate: null,
// cape: null,
// gauntlets: null,
// legs: null,
// shoes: null,
// shield: null,
// weapon: null,
