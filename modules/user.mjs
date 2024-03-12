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
// flytte til egen inventory fil? ta med items der også
export const inventory = {
  id: null,
  armor: { startingSet: {}, bronzeSet: {}, ironSet: {}, steelSet: {} },
  weapon: { startingSet: {}, bronzeSet: {}, ironSet: {}, steelSet: {} },
  consumables: {},
  resources: {},
  equipped: {
    helm: {},
    chestPlate: {},
    cape: {},
    gauntlets: {},
    legs: {},
    shoes: {},
    shield: {},
    weapon: {},
  },
};
