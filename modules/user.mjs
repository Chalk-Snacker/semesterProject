import { Skill, Inventory } from "./UserGameData.mjs";
class User {
  constructor() {
    this.email = "";
    this.pswHash = "";
    this.nick = "";
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
  }
}
export default User;
