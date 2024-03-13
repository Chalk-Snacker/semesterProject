import { Skill } from "./skills.mjs";
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
