export class Skill {
  constructor(skillName) {
    this.skillName = skillName;
    this.lvl = 1;
    this.xp = 0;
    this.xpThreshHold = {};
    this.restXp = 0; // when lvl up, remaining xp will be tranfered towards next lvl
    for (let i = 0; i < 100; i++) {
      this.xpThreshHold[i] = 50 * i;
    }
  }
  lvlUp() {
    console.log("condition met");
    this.restXp = this.xp % this.xpThreshHold[this.lvl];
    this.xp = this.restXp;
    this.restXp = 0;
    this.lvl++;
  }
}

class Items {
  //
}
