export function lvlUp(currentXp, currentLvl, xpThreshHold, restXp) {
  restXp = currentXp % xpThreshHold;
  currentXp = restXp;
  currentLvl++;
  return { currentXp, currentLvl, xpThreshHold, restXp };
}
