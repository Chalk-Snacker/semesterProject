"use strict";

let progressInnerBarDiv,
  newLvl,
  currentXp,
  oldLvl,
  xpIncreasePx,
  skillInterval,
  jau,
  userInventoryData,
  items,
  fetchData,
  xpThreshHold,
  userLoginId = null;
// let innerBar = null;
let leveledUp = false;
let remainder = null;
const inventorySlots = [];
const inventoryCategories = ["armor", "weapons", "spells", "consumables", "resources"];
let listOfSkills = null;
let userDataValues = null;
let listOfInventoryCategories = null;
let userId = null;
export async function loadGame(userId) {
  // lagrer brukerens id i localStorage, og alle requests bruker id for å finne riktig bruker
  userLoginId = userId;
  localStorage.setItem("userLoginId", JSON.stringify(userLoginId));
  console.log(userLoginId);
  userDataValues = await userData(userLoginId);
  userDataValues = userDataValues.user;
  listOfSkills = Object.keys(userDataValues.skills);
  listOfInventoryCategories = Object.keys(userDataValues.inventory);

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

  for (let i = 0; i < listOfSkills.length; i++) {
    const skillListDiv = document.createElement("div");
    skillListDiv.classList.add("skillListDiv");
    skillListDiv.id = "skillListDiv_" + listOfSkills[i];
    // name of skill
    const skillName = document.createElement("h1");
    skillName.classList.add("skillName"); // style general for all
    skillName.innerText = captializeFirstLetter(listOfSkills[i]);

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
    skillLvl.innerText = "Lvl " + userDataValues.skills[listOfSkills[i]].lvl;

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
    updateSkillLvlXpBar(listOfSkills[i], null, false); // oppdaterer xpbar så den starter med riktig xp og ikke 0 hver gang
  }
}

function initBattle() {
  // asdf
}

function initInventory(aContainer) {
  const inventoryLeftDiv = document.createElement("div");
  const inventoryRightDiv = document.createElement("div");
  inventoryLeftDiv.id = "inventoryLeftDiv";
  inventoryRightDiv.id = "inventoryRightDiv";
  const inventoryCategoryHeader = document.createElement("div");
  inventoryCategoryHeader.id = "inventoryCategoryHeader";
  const inventoryContainer = document.createElement("div");
  //inventory slot, grid style
  for (let j = 0; j < 24; j++) {
    const inventorySlot = document.createElement("div");
    inventorySlot.classList.add("inventorySlotsDiv"); // to give all of them a general style
    const uniqueId = "inventorySlot" + j;
    inventorySlot.id = uniqueId;
    jau = document.getElementById("inventorySlot");
    // inventorySlot.innerText = j;
    // jau.innerText = "test" + j;
    // inventorySlots.push(j);
    inventorySlots.push(uniqueId);
    inventorySlot.dataset.slotId = j;
    inventoryRightDiv.appendChild(inventorySlot);
  }
  //inventory category buttons
  for (let i = 0; i < inventoryCategories.length; i++) {
    const button = document.createElement("button");
    button.id = inventoryCategories[i] + "Button";
    button.addEventListener("click", function () {
      showItems(listOfInventoryCategories[i]);
    });
    inventoryCategoryHeader.appendChild(button);
  }
  inventoryRightDiv.appendChild(inventoryContainer);

  aContainer.appendChild(inventoryCategoryHeader);
  aContainer.appendChild(inventoryLeftDiv);
  aContainer.appendChild(inventoryRightDiv);

  // console.log(document.getElementsByTagName("*").length);

  // create the rest of inventory system
}

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
    try {
      // add resources to be added into inventory later
      leveledUp = false;
      let skillLvl = document.getElementById("skillLvl_" + aSkill);
      let xpIncrease = 12;

      fetchData = await userData(userLoginId);
      currentXp = fetchData.user.skills[aSkill].xp;
      oldLvl = fetchData.user.skills[aSkill].lvl;
      currentXp += xpIncrease;
      // regner ut resterende xp før den er oppdatert i tilfelle den lvl opp, regner vi på feil xå og thresh hold
      xpThreshHold = fetchData.user.skills[aSkill].xpThreshHold;
      remainder = currentXp % xpThreshHold;
      console.log("currentXp", currentXp, "fetchData.user.skills[aSkill].xpThreshHold", fetchData.user.skills[aSkill].xpThreshHold);
      console.log("remainder", remainder);

      const updatedData = await updateXp(aSkill, currentXp);
      newLvl = updatedData.userData[aSkill].lvl;
      skillLvl.innerText = "Lvl " + newLvl;
      xpIncrease = updatedData.userData[aSkill].xp;
      xpThreshHold = updatedData.userData[aSkill].xpThreshHold; // oppdaterer xpThreshHold så kan regne ut xp i px forhold til 100% (xpThreshHold)

      if (oldLvl == newLvl || newLvl == null) {
        // vi har ikke levlet og skal bare øke baren med xpIncrease
        updateSkillLvlXpBar(aSkill, leveledUp, true, xpIncrease);
      } else {
        // leveled up
        leveledUp = true;
        // restXp blir nulla på server i utregning før jeg får henta den ut, så hvis vi lvl opp henter jeg ut xp som er hva restXp var på server
        updateSkillLvlXpBar(aSkill, leveledUp, true, xpIncrease);
      }
    } catch (error) {
      console.error("Interval error:", error);
    }
  }, 5000);
}

async function updateSkillLvlXpBar(skillName, leveledUp, increase, xpIncrease) {
  const innerBar = document.getElementById("skillXpBarInnerDiv_" + skillName);
  if (increase) {
    if (!leveledUp) {
      // regner om xp til px økning for xp bar
      xpIncrease = xpIncrease * (150 / xpThreshHold); // let xpIncreasePx istedenfor? definere den her istedenfor global siden den ikke brukes noen andre steder, gjør dette med andre variabler også, ikke ha de global his de ikke brukes andre steder
      innerBar.style.width = xpIncrease + "px";
    } else {
      remainder = remainder * (150 / xpThreshHold);
      innerBar.style.width = remainder + "px";
    }
    innerBar.offsetWidth; // Force repaint
    return;
  } else {
    fetchData = await userData(userLoginId); // henter ny data for å oppdatere verdier når du logger inn
    xpIncrease = fetchData.user.skills[skillName].xp * (150 / fetchData.user.skills[skillName].xpThreshHold);
    innerBar.style.width = xpIncrease + "px";
  }
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

async function updateXp(skillName, currentXp) {
  const updatedSkillXp = {
    [skillName]: {
      xp: currentXp,
    },
  };
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ updatedSkillXp, userLoginId }),
  };
  try {
    const response = await fetch(`http://localhost:8080/game/${skillName}`, requestOptions);

    if (response.status !== 200) {
      console.log("Error editing user");
      throw new Error("Server error: " + response.status);
    }
    let newData = await response.json();
    return newData;
  } catch (error) {
    console.log(error);
  }
}

// funksjon for å targette inventoryslot
async function showItems(inventoryCategory) {
  userInventoryData = await userData();
  // clearing the inventory before listing (new) items
  for (let i = 0; i < inventorySlots.length; i++) {
    let slotId = inventorySlots[i];
    let slotDiv = document.getElementById(slotId);
    slotDiv.innerText = "";
  }
  let itemTypes = Object.keys(userInventoryData[0].inventory[inventoryCategory]);
  for (let i = 0; i < itemTypes.length; i++) {
    if (itemTypes[i] == "inventoryCategory") {
      continue;
    }
    items = userInventoryData[0].inventory[inventoryCategory][itemTypes[i]];
    for (let j = 0; j < items.length; j++) {
      let item = items[j].item;
      // console.log(item.name);

      jau = document.getElementById(inventorySlots[i - 1]);
      jau.innerText = item.name + "\n" + "Level: " + item.lvlReq;
      // const img = document.createElement("img");
      // img.src = "./asset/skillsTest.jpg";
      // jau.appendChild(img);
    }
  }
}

// funksjon for å hente ut brukerdata fra db
async function userData() {
  let requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userLoginId),
    credentials: "include",
  };
  try {
    let response = await fetch("http://localhost:8080/game/profile", requestOptions);
    if (response.status !== 200) {
      console.log("Error getting stuff!");
      throw new Error("Server error: " + response.status);
    }
    let data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

function captializeFirstLetter(aName) {
  let firstLetter = aName.charAt(0).toUpperCase();
  let rest = aName.slice(1);
  return firstLetter + rest;
}
