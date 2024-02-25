"use strict";
import { loadTemplates } from "./gameLogin.mjs";
let newLvl,
  currentXp,
  oldLvl,
  skillInterval,
  jau,
  userInventoryData,
  items,
  fetchData,
  xpThreshHold,
  userLoginId,
  remainder,
  listOfSkills,
  userDataValues,
  listOfInventoryCategories = null;

let leveledUp = false;

const inventorySlots = [];
const inventoryCategories = ["armor", "weapons", "spells", "consumables", "resources"];

function switchgameplay(gameplayType) {
  // load correct gameplay template
  const gameplayContainer = document.getElementById("gameplayContainer");
  gameplayContainer.innerHTML = "";
  gameplayContainer.appendChild(document.importNode(document.getElementById(gameplayType).content, true));
  clearInterval(skillInterval);
  // run code depending on template
  console.log(gameplayType);
  switch (gameplayType) {
    case "idleTemplate":
      initidle();
      break;
    case "inventoryTemplate":
      initInventory();
      break;
    case "settingsTemplate":
      initSettings();
      break;
  }
}

export async function loadGame(userId) {
  userLoginId = userId;
  localStorage.setItem("userLoginId", JSON.stringify(userLoginId));
  userDataValues = await userData(userLoginId);
  userDataValues = userDataValues.user;
  listOfSkills = Object.keys(userDataValues.skills);
  listOfInventoryCategories = Object.keys(userDataValues.inventory);

  // -------- Main Buttons on side --------
  const battleButton = document.getElementById("battleButton");
  const shopButton = document.getElementById("shopButton");
  const inventoryButton = document.getElementById("inventoryButton");
  const idleButton = document.getElementById("idleButton");
  const settingsButton = document.getElementById("settingsButton");

  battleButton.addEventListener("click", function () {
    switchgameplay("battleTemplate");
  });
  shopButton.addEventListener("click", function () {
    switchgameplay("shopTemplate");
  });
  inventoryButton.addEventListener("click", function () {
    switchgameplay("inventoryTemplate");
  });
  idleButton.addEventListener("click", function () {
    switchgameplay("idleTemplate");
  });
  settingsButton.addEventListener("click", function () {
    switchgameplay("settingsTemplate");
  });

  switchgameplay("idleTemplate");
}

function initidle() {
  // Progressbar
  const progressOuterBarDiv = document.getElementById("progressOuterBarDiv");
  const progressInnerBarDiv = document.getElementById("progressInnerBarDiv");
  progressOuterBarDiv.style.visibility = "hidden";
  progressOuterBarDiv.style.display = "none";

  const idleTopLeftDiv = document.getElementById("idleTopLeftDiv");
  const idleBottomDiv = document.getElementById("idleBottomDiv");
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

function initInventory() {
  const inventoryLeftDiv = document.getElementById("inventoryLeftDiv");
  const inventoryRightDiv = document.getElementById("inventoryRightDiv");
  const inventoryCategoryHeader = document.getElementById("inventoryCategoryHeader");

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

  // console.log(document.getElementsByTagName("*").length);
}

function initShop() {
  // asdf
}

function initSettings() {
  const editUserButton = document.getElementById("editUserButton");
  const deleteUserButton = document.getElementById("deleteUserButton");

  editUserButton.addEventListener("click", function () {
    const newUserName = document.getElementById("textField5").value;
    const newUserPassword = document.getElementById("textField6").value;
    if (newUserName == "" || newUserPassword == "") {
      return;
    } else {
      // send information and use UPDATE on server
      updateUserInformation(newUserName, newUserPassword);
    }
  });
  deleteUserButton.addEventListener("click", function () {
    deleteUser();
    loadTemplates("loginTemplate");

    // bytt til login
  });
  // send newUserName og newUserPassword til server og bruke UPDATE som i skills
}

// ---------------- Skill function ----------------------

function doSkill(aSkill) {
  // const progressOuterBarDiv = document.getElementById("progressOuterBarDiv");
  // progressOuterBarDiv.style.display = "none";
  // progressOuterBarDiv.style.visibility = "hidden";
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
  const progressOuterBarDiv = document.getElementById("progressOuterBarDiv");
  const progressInnerBarDiv = document.getElementById("progressInnerBarDiv");
  progressInnerBarDiv.style.animation = "none";

  // Force a reflow
  void progressInnerBarDiv.offsetWidth;

  progressInnerBarDiv.style.animation = "progress-animation 5s linear infinite";
  progressOuterBarDiv.style.display = "block";
  progressOuterBarDiv.style.visibility = "visible";
}

function captializeFirstLetter(aName) {
  let firstLetter = aName.charAt(0).toUpperCase();
  let rest = aName.slice(1);
  return firstLetter + rest;
}

// ---------------- Button functions for toggling css----------------------

function battle() {
  // css hidden toggle ting her
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

// ---------------- Server requests ----------------------

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
    // const response = await fetch(`http://localhost:8080/game/${skillName}`, requestOptions);
    // const response = await fetch(`https://semesterproject-8m7h.onrender.com/game/${skillName}`, requestOptions);
    const response = await fetch(`/game/${skillName}`, requestOptions);

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
  // let itemTypes = Object.keys(userInventoryData[0].inventory[inventoryCategory]);
  let itemTypes = Object.keys(userInventoryData.user.inventory[inventoryCategory]);

  for (let i = 0; i < itemTypes.length; i++) {
    if (itemTypes[i] == "inventoryCategory") {
      continue;
    }
    // items = userInventoryData[0].inventory[inventoryCategory][itemTypes[i]];
    items = userInventoryData.user.inventory[inventoryCategory][itemTypes[i]];
    for (let j = 0; j < items.length; j++) {
      let item = items[j].item;

      // jau = document.getElementById(inventorySlots[i - 1]);
      jau = document.getElementById(inventorySlots[i]);
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
    // let response = await fetch("http://localhost:8080/game/profile", requestOptions);
    // const response = await fetch(`https://semesterproject-8m7h.onrender.com/game/profile`, requestOptions);
    const response = await fetch(`/game/profile`, requestOptions);

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
async function updateUserInformation(usernameInput, passwordInput) {
  const updatedUserInformation = {
    newUserName: usernameInput,
    newUserPassword: passwordInput,
  };
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ updatedUserInformation, userLoginId }),
  };
  try {
    // const response = await fetch(`http://localhost:8080/user/usrPsw`, requestOptions);
    // const response = await fetch(`https://semesterproject-8m7h.onrender.com/user/Psw`, requestOptions);
    const response = await fetch(`/user/Psw`, requestOptions);

    if (response.status != 200) {
      console.log("Error editing user");
      throw new Error("Server error: " + response.status);
    }
    let newUserName = await response.json(); // make sure to only send the username back, so we can update and display the new name
    return newUserName;
  } catch (error) {
    console.log(error);
  }
}

async function deleteUser() {
  const requestOptions = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userLoginId),
  };
  try {
    // const response = await fetch(`http://localhost:8080/user`, requestOptions);
    // const response = await fetch(`https://semesterproject-8m7h.onrender.com/user`, requestOptions);
    const response = await fetch(`/user`, requestOptions);

    if (response.status != 200) {
      console.log("Error deleting user");
      throw new Error("Server error: " + response.status);
    }
    // let newUserName = await response.json(); // make sure to only send the username back, so we can update and display the new name
    // return newUserName;
  } catch (error) {
    console.log(error);
  }
}
