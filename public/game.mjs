"use strict";

let progressInnerBarDiv,
  newLvl,
  newXp,
  oldLvl,
  xpIncreasePx,
  skillInterval,
  jau,
  userInventoryData,
  items,
  fetchData,
  xpThreshHold,
  userLoginId = null;
let isRest = false;
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
      // console.log("hei jeg er et interval");
      isRest = false;
      let skillLvl = document.getElementById("skillLvl_" + aSkill);
      let xpIncrease = 12;
      // console.log("jeg logges før vi henter data1");
      // console.log(newData);
      fetchData = await userData(userLoginId);
      newXp = fetchData.user.skills[aSkill].xp;
      oldLvl = fetchData.user.skills[aSkill].lvl;
      // console.log(newXp);
      newXp += xpIncrease;
      const updatedData = await updateXp(aSkill, newXp);
      // console.log("jeg logges før vi henter data2");
      // newData = await userData(userLoginId);
      // newLvl = newData.user.skills[aSkill].lvl;
      // const updatedData = await updateXp();
      console.log("sjekk på denne om den er riktig ", updatedData);
      // newLvl = updatedData.userData.skills[aSkill].lvl;
      newLvl = updatedData.userData[aSkill].lvl;

      skillLvl.innerText = "Lvl " + newLvl;
      // console.log("oldLvl", oldLvl, "newLvl", newLvl);

      // const xpThreshHold = userDataValues[0].skills[aSkill].xpThreshHold[oldLvl];
      // let xpThreshHold = newData.user.skills[aSkill].xpThreshHold[oldLvl];
      // console.log("xpThreshHold", xpThreshHold, "oldLvl", oldLvl);
      const xpThreshHold = fetchData.user.skills[aSkill].xpThreshHold;

      xpIncreasePx = xpIncrease * (150 / xpThreshHold);
      // console.log("hvorfor går vi ikke inn i if? ", " oldLvl", oldLvl, "newLvl", newLvl);
      if (oldLvl == newLvl || newLvl == null) {
        console.log("finn meg"); // logges ikke 🤔  // de er alltid like, blir oppdatert samtidig?
        updateSkillLvlXpBar(aSkill, xpIncreasePx);
      } else {
        console.log("SER DU DENNE SÅ ER IKKE oldLvl LIK newLvl LENGER !!!!");
        isRest = true;
        const remainder = newXp % xpThreshHold;
        const remainderPixels = remainder * (150 / xpThreshHold);
        console.log("remainder ", remainderPixels);
        updateSkillLvlXpBar(aSkill, remainder);
      }
    } catch (error) {
      console.error("Interval error:", error);
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

async function updateXp(skillName, newXp) {
  const updatedSkillXp = {
    [skillName]: {
      xp: newXp,
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
    console.log(newData);
    return newData;
    // console.log("KAN DETTE BRUKES SOM NY DATA ?????", data);
    // const data = await response.json();
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
    // if (response.status !== 201 && response.status !== 200) {
    if (response.status !== 200) {
      console.log("Error getting stuff!");
      throw new Error("Server error: " + response.status);
    }
    let data = await response.json();
    console.log(data);
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
