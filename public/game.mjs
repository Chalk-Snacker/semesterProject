"use strict";
let progressInnerBarDiv,
  newLvl,
  newXp,
  oldLvl,
  xpIncreasePx,
  skillInterval,
  jau = null;
let isRest = false;
const inventorySlots = [];
const inventoryCategories = ["armor", "weapons", "spells", "consumables", "resources"];
const userDataValues = await userData();
const listOfSkills = Object.keys(userDataValues[0].skills);

export function loadGame() {
  // hent informasjon om brukeren fra serveren og erstatt statiske verdier under (brukt for testing) med dem
  // sjekk for om brukernavn og passord er riktig, gjøres ikke i loadGame, men i gameLogon.mjs
  // når loadGame kjøres, hentes alle stats, xp, items i inventory, penger og spillernavn fra serveren utifra brukeren
  // hvis du er på en gjestbruker, vil du starte med et fastoppsett som alle nye brukere starter med, men vil ikke få mulighet til å lagre dataen
  const containerOuter = document.getElementById("containerBackgroundOuter");
  const containerInner = document.getElementById("containerBackgroundInner");
  const containerGameplay = document.getElementById("containerGameplayZone");

  const div = document.createElement("div");
  div.id = "container";
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

  initShop(div);
  initIdle(div);
  initSettings(div);
  initInventory(div);
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
    skillLvl.id = `skillLvl_${listOfSkills[i]}`;
    skillLvl.innerText = "lvl " + userDataValues[0].skills[listOfSkills[i]].lvl;
    //skill icon
    const img = document.createElement("img");
    img.id = "skillIcon";
    img.src = "./asset/skillsTest.jpg";

    skillListDiv.appendChild(skillName); // skill name
    lvlXpContainer.appendChild(skillLvl);
    lvlXpContainer.append(skillXpBarOuterDiv);

    skillXpBarOuterDiv.appendChild(skillXpBarInnerDiv); // skillXpBarInner
    skillListDiv.appendChild(lvlXpContainer);
    skillListDiv.appendChild(img); // skill icon
    idleTopLeftDiv.appendChild(skillListDiv);

    // skill buttons
    const skillButton = document.createElement("button");
    skillButton.id = listOfSkills[i] + "Button";
    skillButton.addEventListener("click", function () {
      doSkill(listOfSkills[i]);
    });
    idleBottomDiv.appendChild(skillButton);
  }
}

function updateSkillLvlXpBar(skillName, xpValue) {
  const innerBar = document.getElementById("skillXpBarInnerDiv_" + skillName);
  // width is not set, so i set it to be 0 if we have 0 xp on the bar
  let currentWidth = parseFloat(innerBar.style.width) || 0;
  if (!isRest) {
    currentWidth += parseFloat(xpValue);
    innerBar.style.width = currentWidth + "px";
  } else {
    innerBar.style.width = 0;
    innerBar.style.width = xpValue + "px";
  }
  innerBar.offsetWidth; // Force repaint
}

function initBattle() {
  // asdf
}

// function initInventory(aContainer) {
//   const inventoryLeftDiv = document.createElement("div");
//   const inventoryRightDiv = document.createElement("div");
//   inventoryLeftDiv.id = "inventoryLeftDiv";
//   inventoryRightDiv.id = "inventoryRightDiv";

//   const inventoryCategoryHeader = document.createElement("div");
//   inventoryCategoryHeader.id = "inventoryCategoryHeader";

//   for (let i = 0; i < inventoryCategories.length; i++) {
//     const button = document.createElement("button");
//     button.id = inventoryCategories[i] + "Button";
//     button.addEventListener("click", function () {
//       console.log("jau");
//       // fetchInventory();
//     });
//     inventoryCategoryHeader.appendChild(button);
//   }

//   const inventoryContainer = document.createElement("div");
//   // lag inventory divs (som en skill levels)

//   aContainer.appendChild(inventoryCategoryHeader);
//   aContainer.appendChild(inventoryLeftDiv);
//   aContainer.appendChild(inventoryRightDiv);

//   console.log(document.getElementsByTagName("*").length);

//   // create the rest of inventory system
// }

function initShop() {
  // asdf
}

function initSettings() {
  // asdf
}

// ---------------- Skill function ----------------------
function doSkill(aSkill) {
  const progressOuterBarDiv = document.getElementById("progressOuterBarDiv");
  progressOuterBarDiv.style.display = "none";
  progressOuterBarDiv.style.visibility = "hidden";
  clearInterval(skillInterval);
  showAnimationBar();

  skillInterval = setInterval(async function () {
    // add resources to be added into inventory later
    isRest = false;
    let skillLvl = document.getElementById("skillLvl_" + aSkill);
    let xpIncrease = 12;
    newXp = await userData();
    newXp = newXp[0].skills[aSkill].xp;
    newXp += xpIncrease;
    oldLvl = await userData();
    oldLvl = oldLvl[0].skills[aSkill].lvl;
    updateXp(aSkill, newXp);

    newLvl = await userData();
    newLvl = newLvl[0].skills[aSkill].lvl;
    skillLvl.innerText = "lvl " + newLvl;
    const xpThreshHold = userDataValues[0].skills[aSkill].xpThreshHold[oldLvl];
    xpIncreasePx = xpIncrease * (150 / xpThreshHold);
    if (oldLvl == newLvl || newLvl == null) {
      updateSkillLvlXpBar(aSkill, xpIncreasePx);
    } else {
      isRest = true;
      const remainder = newXp % xpThreshHold;
      const remainderPixels = remainder * (150 / xpThreshHold);
      console.log("remainder ", remainderPixels);
      updateSkillLvlXpBar(aSkill, remainder);
    }
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

async function fetchInventory() {
  // newXp = await userData();
  // newXp = newXp[0].skills[aSkill].xp;
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

async function updateXp(skillName, newXp) {
  // fiks funksjon senere når du har pålogging, så du kan sjekke på token så kun skill lvl på den ene brukeren øker.
  const updatedSkillXp = {
    [skillName]: {
      xp: newXp,
    },
  };
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedSkillXp),
  };
  try {
    const response = await fetch(`http://localhost:8080/game/${skillName}`, requestOptions);

    if (response.status !== 200) {
      console.log("Error editing user");
      throw new Error("Server error: " + response.status);
    }
    const data = await response.json();
  } catch (error) {
    console.log(error);
  }
}

//--------- SCRAPPED GRID INVENTORY SYSTEM? -----------

function initInventory(aContainer) {
  const inventoryLeftDiv = document.createElement("div");
  const inventoryRightDiv = document.createElement("div");
  inventoryLeftDiv.id = "inventoryLeftDiv";
  inventoryRightDiv.id = "inventoryRightDiv";
  const inventoryCategoryHeader = document.createElement("div");
  inventoryCategoryHeader.id = "inventoryCategoryHeader";
  const inventoryContainer = document.createElement("div");
  for (let j = 0; j < 24; j++) {
    const inventorySlot = document.createElement("div");
    inventorySlot.classList.add("inventorySlotsDiv"); // to give all of them a general style
    const uniqueId = "inventorySlot" + j;
    inventorySlot.id = uniqueId;
    jau = document.getElementById("inventorySlot");

    inventorySlots.push(j);
    inventorySlot.dataset.slotId = j;
    inventoryRightDiv.appendChild(inventorySlot);
  }
  for (let i = 0; i < inventoryCategories.length; i++) {
    const button = document.createElement("button");
    button.id = inventoryCategories[i] + "Button";
    button.addEventListener("click", function () {
      console.log("jau");
      Testtt(1);
      // fetchInventory();
    });
    inventoryCategoryHeader.appendChild(button);
  }
  inventoryRightDiv.appendChild(inventoryContainer);

  aContainer.appendChild(inventoryCategoryHeader);
  aContainer.appendChild(inventoryLeftDiv);
  aContainer.appendChild(inventoryRightDiv);

  console.log(document.getElementsByTagName("*").length);

  // create the rest of inventory system
}
function Testtt(slotId) {
  jau = document.getElementById("inventorySlot" + inventorySlots[slotId]); // parse inn tall senere
  console.log(slotId);
  const img = document.createElement("img");
  img.src = "./asset/skillsTest.jpg";
  console.log(jau);
  jau.appendChild(img);
}
setTimeout(() => {
  // laster før de divene blir lagd, kanskje funker når den blir async func?
  // få spillet itl å starte i idle, og kun kjøre denne (laster inn inventory)
  // når du trykker på inventory knapp
  // husk å gjem css og (clear divs?)
  Testtt(inventorySlots[2]);
}, 1000);
/* 
1. opprett et item på serveren
2. hent dataen, og få item inn i første inventory slot
3. med for loop, fyll inventory med alle items spiller har
*/
