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
  lvlUp(skillName) {
    if (this.skills[skillName]) {
      this.skills[skillName].lvlUp();
    }
  }
}
export default User;
