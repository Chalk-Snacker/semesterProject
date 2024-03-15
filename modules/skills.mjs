export class Skill {
  constructor(skillName) {
    this.skillName = skillName;
    this.lvl = 1;
    this.xp = 0;
    this.xpThreshHold = this.lvl * 50;
    this.restXp = 0;
  }
}

export function lvlUp(currentXp, currentLvl, xpThreshHold, restXp) {
  restXp = currentXp % xpThreshHold;
  currentXp = restXp;
  currentLvl++;
  return { currentXp, currentLvl, xpThreshHold, restXp };
}
