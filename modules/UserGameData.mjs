export class Skill {
  constructor(skillName) {
    this.skillName = skillName;
    this.lvl = 1;
    this.xp = 0;
    this.xpThreshHold = this.lvl * 50;
    // flytt threshhold ut fra constructor, trenger ikke å ha den i brukeren
    // evt bytte ut xpThreshHold med xpNeededForLvlUp og endre verdien hvergang du lvl opp
    // this.xpNeededLvlUp;
    this.restXp = 0; // when lvl up, remaining xp will be tranfered towards next lvl
  }
  lvlUp2() {
    console.log("condition met");
    this.restXp = this.xp % this.xpThreshHold[this.lvl];
    this.xp = this.restXp;
    this.restXp = 0;
    this.lvl++;
  }
}
