import { Skill } from "./skills.mjs";

export class User {
  constructor(name, mail, password) {
    this.id;
    this.nick = name;
    this.email = mail;
    this.pswHash = password;
    this.skills = {
      woodcutting: new Skill("Woodcutting"),
      mining: new Skill("Mining"),
      fishing: new Skill("Fishing"),
      cooking: new Skill("Cooking"),
    };
  }
}
