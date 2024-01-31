import { Skill } from "./UserGameData.mjs";
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
  }
}
export default User;
