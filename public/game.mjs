"use strict";
let woodcuttingInterval,
  miningInterval,
  fishingInterval,
  cookingInterval,
  progressInnerBarDiv = null;

let userDataValues = await userData();
console.log(userDataValues);
const listOfSkills = Object.keys(userDataValues[0].skills);
// console.log(listOfSkills[1]);
console.log(userDataValues[0].skills[listOfSkills[0]].lvl);

let testVar = 1;

export function loadGame() {
  // hent informasjon om brukeren fra serveren og erstatt statiske verdier under (brukt for testing) med dem
  // sjekk for om brukernavn og passord er riktig, gjøres ikke i loadGame, men i gameLogon.mjs
  // når loadGame kjøres, hentes alle stats, xp, items i inventory, penger og spillernavn fra serveren utifra brukeren
  // hvis du er på en gjestbruker, vil du starte med et fastoppsett som alle nye brukere starter med, men vil ikke få mulighet til å lagre dataen
  const containerOuter = document.getElementById("containerBackgroundOuter");
  const containerInner = document.getElementById("containerBackgroundInner");
  const containerGameplay = document.getElementById("containerGameplayZone");

  const div = document.createElement("div");
  containerOuter.appendChild(div);
  containerInner.appendChild(div);
  containerGameplay.appendChild(div);

  // -------- Main Buttons on side --------

  // battle button
  const battleButton = document.createElement("button");
  battleButton.id = "battleButton";
  battleButton.addEventListener("click", function () {});
  containerInner.appendChild(battleButton);

  // inventory button
  const InventoryButton = document.createElement("button");
  InventoryButton.id = "inventoryButton";
  InventoryButton.addEventListener("click", inventory);

  containerInner.appendChild(InventoryButton);

  // shop button
  const shopButton = document.createElement("button");
  shopButton.id = "shopButton";
  shopButton.addEventListener("click", shop);

  containerInner.appendChild(shopButton);

  // idle button
  const idleButton = document.createElement("button");
  idleButton.id = "idleButton";
  idleButton.addEventListener("click", idle);
  containerInner.appendChild(idleButton);

  // settings button
  const settingsButton = document.createElement("button");
  settingsButton.innerText = "settings";
  settingsButton.id = "settingsButton";
  settingsButton.addEventListener("click", settings);
  containerInner.appendChild(settingsButton);
  // ------------ End of Buttons ---------

  initBattle(div);
  initInventory(div);
  initShop(div);
  initIdle(div);
  initSettings(div);
}

function initIdle(aContainer) {
  // Creates idle UI:
  const idleTopDiv = document.createElement("div");
  const idleTopLeftDiv = document.createElement("div");
  const idleTopRightDiv = document.createElement("div");
  idleTopDiv.id = "idleTopDiv";
  idleTopLeftDiv.id = "idleTopLeftDiv";
  idleTopRightDiv.id = "idleTopRightDiv";

  const idleBottomDiv = document.createElement("div");
  idleBottomDiv.id = "idleBottomDiv";
  aContainer.appendChild(idleTopDiv);
  aContainer.appendChild(idleBottomDiv);
  idleTopDiv.appendChild(idleTopLeftDiv);
  idleTopDiv.appendChild(idleTopRightDiv);

  // Progressbar
  const progressOuterBarDiv = document.createElement("div");
  const progressInnerBarDiv = document.createElement("div");
  progressOuterBarDiv.id = "progressOuterBarDiv";
  progressInnerBarDiv.id = "progressInnerBarDiv";
  idleTopRightDiv.appendChild(progressOuterBarDiv);
  progressOuterBarDiv.appendChild(progressInnerBarDiv);
  progressOuterBarDiv.style.visibility = "hidden";
  progressOuterBarDiv.style.display = "none";

  // Skill list
  // skriv det heller om senere, bare kod slik at du har spillet "ferdig" og kan heller oppdatere det senere for server
  for (let i = 0; i < listOfSkills.length; i++) {
    // console.log(userDataValues[0].skills[listOfSkills[i]]);
    const skillListDiv = document.createElement("div");
    skillListDiv.classList.add("skillListDiv");
    skillListDiv.id = "skillListDiv_" + listOfSkills[i];
    // name of skill
    const skillName = document.createElement("h1");
    skillName.classList.add("skillName"); // style general for all
    skillName.innerText = userDataValues[0].skills[listOfSkills[i]].skillName;

    // xp and lvl tracking
    const lvlXpContainer = document.createElement("div");
    const skillXpBarOuterDiv = document.createElement("div");
    const skillXpBarInnerDiv = document.createElement("div");
    skillXpBarOuterDiv.id = "skillXpBarOuterDiv";
    skillXpBarInnerDiv.id = "skillXpBarInnerDiv_" + listOfSkills[i];
    // skill lvl
    const skillLvl = document.createElement("h3");
    skillLvl.classList.add("skillLvl");
    // skillLvl.id = `skillLvl_${listOfSkills[i]}`;
    skillLvl.innerText = "lvl " + userDataValues[0].skills[listOfSkills[i]].lvl;
    //skill icon
    const img = document.createElement("img");
    img.id = "skillIcon";
    img.src = "./asset/skillsTest.jpg";

    skillListDiv.appendChild(skillName); // skill name
    lvlXpContainer.appendChild(skillLvl);
    lvlXpContainer.append(skillXpBarOuterDiv);

    // skillListDiv.appendChild(skillXpBarOuterDiv); // skillXpBarOuter
    skillXpBarOuterDiv.appendChild(skillXpBarInnerDiv); // skillXpBarInner
    skillListDiv.appendChild(lvlXpContainer);
    // skillListDiv.appendChild(skillLvl); //  skill lvl
    skillListDiv.appendChild(img); // skill icon
    idleTopLeftDiv.appendChild(skillListDiv);
  }

  // --- Buttons ---

  // Woodcutting button
  const woodcuttingButton = document.createElement("button");
  woodcuttingButton.id = "woodCuttingButton";
  woodcuttingButton.addEventListener("click", woodcutting);
  idleBottomDiv.appendChild(woodcuttingButton);

  // Mining button
  const miningButton = document.createElement("button");
  miningButton.id = "miningButton";
  miningButton.addEventListener("click", mining);
  idleBottomDiv.appendChild(miningButton);

  // Fishing button
  const fishingButton = document.createElement("button");
  fishingButton.id = "fishingButton";
  fishingButton.addEventListener("click", fishing);
  idleBottomDiv.appendChild(fishingButton);

  // Cooking button
  const cookingButton = document.createElement("button");
  cookingButton.id = "cookingButton";
  cookingButton.addEventListener("click", cooking);
  idleBottomDiv.appendChild(cookingButton);
  // ---- END OF IDLE UI ----
}
function updateSkillLvlXpBar(skillName, xpValue) {
  const innerBar = document.getElementById("skillXpBarInnerDiv_" + skillName);
  // width is not set, so i set it to be 0 if we have 0 xp on the bar
  let currentWidth = parseFloat(innerBar.style.width) || 0;
  currentWidth += parseFloat(xpValue);
  innerBar.style.width = currentWidth + "px";
  innerBar.offsetWidth; // Force repaint
}

function initBattle() {
  // asdf
}

function initInventory(aContainer) {
  const inventoryLeftDiv = document.createElement("div");
  const inventoryRightDiv = document.createElement("div");
  inventoryLeftDiv.id = "inventoryLeftDiv";
  inventoryRightDiv.id = "inventoryRightDiv";

  aContainer.appendChild(inventoryLeftDiv);
  aContainer.appendChild(inventoryRightDiv);

  // create the rest of inventory system
}

function initShop() {
  // asdf
}

function initSettings() {
  // asdf
}

// ---------------- Skill functions ----------------------
let newLvl = null;
function woodcutting() {
  const progressOuterBarDiv = document.getElementById("progressOuterBarDiv");
  progressOuterBarDiv.style.display = "none";
  progressOuterBarDiv.style.visibility = "hidden";
  clearInterval(miningInterval);
  clearInterval(fishingInterval);
  clearInterval(cookingInterval);
  clearInterval(woodcuttingInterval);
  showAnimationBar();

  woodcuttingInterval = setInterval(async function () {
    // oppdater verdier her med sjekker og alt annet ig orker ikke mer nå...

    testVar++;
    console.log("amount of wood: " + testVar);
    updateSkillLvlXpBar(listOfSkills[0], "10px");
    newLvl = await userData();
    newLvl = newLvl[0].skills[listOfSkills[0]].lvl;
    newLvl++;

    updateLvl("woodcutting", newLvl);
    // console.log(userDataValues[0].skills[listOfSkills[0]].lvl);

    // skillIncrease(skillLvl_woodcutting);
  }, 5000);
}

function mining() {
  const progressOuterBarDiv = document.getElementById("progressOuterBarDiv");
  progressOuterBarDiv.style.display = "none";
  progressOuterBarDiv.style.visibility = "hidden";
  clearInterval(woodcuttingInterval);
  clearInterval(fishingInterval);
  clearInterval(cookingInterval);
  clearInterval(miningInterval);

  showAnimationBar();

  miningInterval = setInterval(function () {
    console.log("mining test");
    updateSkillLvlXpBar(listOfSkills[1], "10px");
  }, 5000);
}

function fishing() {
  const progressOuterBarDiv = document.getElementById("progressOuterBarDiv");
  progressOuterBarDiv.style.display = "none";
  progressOuterBarDiv.style.visibility = "hidden";
  clearInterval(woodcuttingInterval);
  clearInterval(miningInterval);
  clearInterval(cookingInterval);
  clearInterval(fishingInterval);

  showAnimationBar();

  fishingInterval = setInterval(function () {
    console.log("fishing test");
    updateSkillLvlXpBar(listOfSkills[2], "10px");
  }, 5000);
}

function cooking() {
  const progressOuterBarDiv = document.getElementById("progressOuterBarDiv");
  progressOuterBarDiv.style.display = "none";
  progressOuterBarDiv.style.visibility = "hidden";
  clearInterval(woodcuttingInterval);
  clearInterval(fishingInterval);
  clearInterval(miningInterval);
  clearInterval(cookingInterval);

  showAnimationBar();

  cookingInterval = setInterval(function () {
    console.log("cooking test");
    updateSkillLvlXpBar(listOfSkills[3], "10px");
  }, 5000);
}

function showAnimationBar() {
  let progressOuterBarDiv = document.getElementById("progressOuterBarDiv");

  // progressOuterBarDiv = document.getElementById("progressOuterBarDiv");
  progressInnerBarDiv = document.getElementById("progressInnerBarDiv");
  progressInnerBarDiv.style.animation = "none";

  // Force a reflow
  void progressInnerBarDiv.offsetWidth;

  progressInnerBarDiv.style.animation = "progress-animation 5s linear infinite";
  progressOuterBarDiv.style.display = "block";
  progressOuterBarDiv.style.visibility = "visible";
}

// ---------------- Button functions for toggling css----------------------

function battle() {
  // css hidden toggle ting her
}
function inventory() {
  // hides the progressbar so that it doesnt automatically runs when going back to idle
  progressOuterBarDiv.style.visibility = "hidden";
  progressOuterBarDiv.style.display = "none";

  // rest of function
  const test1 = document.getElementById("idleTopDiv");
  const test2 = document.getElementById("idleBottomDiv");
  test1.style.display = "none";
  test1.style.visibility = "hidden";
  test2.style.display = "none";
  test2.style.visibility = "hidden";

  const test3 = document.getElementById("inventoryLeftDiv");
  const test4 = document.getElementById("inventoryRightDiv");
  test3.style.display = "block";
  test3.style.visibility = "visible";
  test4.style.display = "block";
  test4.style.visibility = "visible";
}
function shop() {
  // css hidden toggle ting her
}
function idle() {
  // css hidden toggle ting her
  const test1 = document.getElementById("inventoryLeftDiv");
  const test2 = document.getElementById("inventoryRightDiv");
  test1.style.display = "none";
  test1.style.visibility = "hidden";
  test2.style.display = "none";
  test2.style.visibility = "hidden";

  const test3 = document.getElementById("idleTopDiv");
  const test4 = document.getElementById("idleBottomDiv");
  test3.style.display = "block";
  test3.style.visibility = "visible";
  test4.style.display = "block";
  test4.style.visibility = "visible";

  // husk å gjøre inventory visible igjen (gjelder alle kategorier)
}
function settings() {
  // css hidden toggle ting her
}

async function userData() {
  let requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    // body: JSON.stringify(user),
  };
  try {
    let response = await fetch("http://localhost:8080/game/", requestOptions);
    if (response.status != 200) {
      console.log("Error getting stuff!");
      throw new Error("Server error: " + response.status);
    }
    let data = await response.json();
    // console.log("ka e detta? ", data);
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function updateLvl(skillName, newLvl) {
  // fiks funksjon senere når du har pålogging, så du kan sjekke på token så kun skill lvl på den ene brukeren øker.
  const updatedSkill = {
    [skillName]: {
      lvl: newLvl,
    },
  };
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedSkill),
  };
  try {
    const response = await fetch(`http://localhost:8080/game/${skillName}`, requestOptions);
    // const response = await fetch(`http://localhost:8080/game/mining`, requestOptions);
    // const response = await fetch(`http://localhost:8080/game/`, requestOptions);

    if (response.status !== 200) {
      console.log("Error editing user");
      throw new Error("Server error: " + response.status);
    }
    const data = await response.json();
  } catch (error) {
    console.log(error);
  }
}

// lage en funksjon som oppdaterer xp, og hvis xp er max så med en if check så øke lvl, eller ha 2 separerte funksjoner?
// function updateSkillLvl(aSkill, ha et parameter til? isåfall newLevel){
//   skillLvl.innerText = "lvl " + userDataValues[0].skills[listOfSkills[i]].lvl;
//     skillLvl.id = `skillLvl_${listOfSkills[i]}`;
// }

/* 
få updateXp og updateLvl til å kunne oppdatere verdier på serveren
kjør den i hvert intervall på skills, så når den er ferdig med å eks. fiske en fisk så kjører denne funksjonen
async function skillIncrase() {
  async function updateXp() {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      // body: JSON.stringify(testPlayerUpdated), // testPlayerUpdated er/ var et object
    };
    try {
      const response = await fetch(`http://localhost:8080/game/${playerName}`, requestOptions);
      if (response.status != 200) {
        console.log("Error editing user");
        throw new Error("Server error: " + response.status);
      }
      const data = await response.json();
    } catch (error) {
      console.log(error);
    }
  }
  async function updateLvl() {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      // body: JSON.stringify(testPlayerUpdated), // testPlayerUpdated er/ var et object
    };
    try {
      const response = await fetch(`http://localhost:8080/game/${playerName}`, requestOptions);
      if (response.status != 200) {
        console.log("Error editing user");
        throw new Error("Server error: " + response.status);
      }
      const data = await response.json();
    } catch (error) {
      console.log(error);
    }
  }
  try {
    const updateXp = await updateXp();
    if (xp >= max xp needed to lvl up) {
      const updateLvl = await updateLvl();
    }
  } catch (error) {
    console.log("error idk");
  }
}
*/
