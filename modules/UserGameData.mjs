export class Skill {
  constructor(skillName) {
    this.skillName = skillName;
    this.lvl = 1;
    this.xp = 0;
    this.xpThreshHold = {
      1: 50,
      2: 100,
      3: 150,
    };
    this.restXp = 0; // when lvl up, remaining xp will be tranfered towards next lvl
  }
  // add methods for lvl, getting xp, lvlup
}

class Items {
  //
}
