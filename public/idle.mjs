"use strict";
import { customFetch, captializeFirstLetter } from "./utilities.mjs";
let newLvl,
  currentXp,
  oldLvl,
  xpThreshHold,
  remainder,
  listOfSkills = null;
let leveledUp = false;
export let skillInterval = null;

export async function initidle() {
  const userData = await customFetch(
    "GET",
    null,
    { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("authToken")}` },
    "/game/profile"
  );
  listOfSkills = Object.keys(userData.user.skills);
  const progressOuterBarDiv = document.getElementById("progressOuterBarDiv");
  progressOuterBarDiv.style.visibility = "hidden";
  progressOuterBarDiv.style.display = "none";

  const idleBottomDiv = document.getElementById("idleBottomDiv");
  for (let i = 0; i < listOfSkills.length; i++) {
    const skillLvl = document.getElementById("skillLvl" + captializeFirstLetter(listOfSkills[i]));
    skillLvl.innerText = "Lvl " + userData.user.skills[Object.keys(userData.user.skills)[i]].lvl;

    const skillButton = document.getElementById(listOfSkills[i] + "Button");
    skillButton.addEventListener("click", function () {
      doSkill(listOfSkills[i]);
    });
    idleBottomDiv.appendChild(skillButton);
    updateSkillLvlXpBar(listOfSkills[i], null, false); // oppdaterer xpbar så den starter med riktig xp og ikke 0 hver gang
  }
}

function doSkill(aSkill) {
  clearInterval(skillInterval);
  showAnimationBar();
  clearInterval(skillInterval);

  skillInterval = setInterval(async function () {
    try {
      leveledUp = false;
      let skillLvl = document.getElementById("skillLvl" + captializeFirstLetter(aSkill));
      let xpIncrease = 12;

      const userData = await customFetch(
        "GET",
        null,
        { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("authToken")}` },
        "/game/profile"
      );

      currentXp = userData.user.skills[aSkill].xp;
      oldLvl = userData.user.skills[aSkill].lvl;
      currentXp += xpIncrease;

      xpThreshHold = userData.user.skills[aSkill].xpThreshHold;
      remainder = currentXp % xpThreshHold;

      const updatedData = await customFetch(
        "PUT",
        JSON.stringify({ name: aSkill, xp: currentXp }),
        { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("authToken")}` },
        "/game/xp"
      );
      showAnimationBar();
      newLvl = updatedData.userData[aSkill].lvl;
      skillLvl.innerText = "Lvl " + newLvl;
      xpIncrease = updatedData.userData[aSkill].xp;
      xpThreshHold = updatedData.userData[aSkill].xpThreshHold;

      if (oldLvl == newLvl || newLvl == null) {
        updateSkillLvlXpBar(aSkill, leveledUp, true, xpIncrease);
      } else {
        leveledUp = true;
        updateSkillLvlXpBar(aSkill, leveledUp, true, xpIncrease);
      }
    } catch (error) {
      console.error("Interval error:", error);
    }
  }, 5000);
}

async function updateSkillLvlXpBar(skillName, leveledUp, increase, xpIncrease) {
  const innerBar = document.getElementById("skillXpBarInnerDiv" + captializeFirstLetter(skillName));

  if (increase) {
    if (!leveledUp) {
      xpIncrease = xpIncrease * (150 / xpThreshHold);
      innerBar.style.width = xpIncrease + "px";
    } else {
      remainder = remainder * (150 / xpThreshHold);
      innerBar.style.width = remainder + "px";
    }
    innerBar.offsetWidth;
    return;
  } else {
    const userData = await customFetch(
      "GET",
      null,
      { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("authToken")}` },
      "/game/profile"
    );
    xpIncrease = userData.user.skills[skillName].xp * (150 / userData.user.skills[skillName].xpThreshHold);
    innerBar.style.width = xpIncrease + "px";
  }
}

function showAnimationBar() {
  const progressOuterBarDiv = document.getElementById("progressOuterBarDiv");
  const progressInnerBarDiv = document.getElementById("progressInnerBarDiv");
  progressInnerBarDiv.style.animation = "none";

  void progressInnerBarDiv.offsetWidth;

  progressInnerBarDiv.style.animation = "progress-animation 5s linear infinite";
  progressOuterBarDiv.style.display = "block";
  progressOuterBarDiv.style.visibility = "visible";
}
