"use strict";
import { loadTemplates } from "./gameLogin.mjs";
let newLvl,
  currentXp,
  oldLvl,
  skillInterval,
  xpThreshHold,
  userLoginId,
  remainder,
  listOfSkills,
  itemClicked = null;

let leveledUp = false;

function switchgameplay(gameplayType) {
  // load correct gameplay template
  const gameplayContainer = document.getElementById("gameplayContainer");
  gameplayContainer.innerHTML = "";
  gameplayContainer.appendChild(document.importNode(document.getElementById(gameplayType).content, true));
  clearInterval(skillInterval);
  // run code depending on template
  switch (gameplayType) {
    case "idleTemplate":
      initidle();
      break;
    case "inventoryTemplate":
      initInventory();
      break;
    case "shopTemplate":
      initShop();
      break;
    case "settingsTemplate":
      initSettings();
      break;
  }
}

export async function loadGame(userId) {
  userLoginId = userId;
  localStorage.setItem("userLoginId", JSON.stringify(userLoginId));

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

async function initidle() {
  const userData = await getUserData(userLoginId);
  listOfSkills = Object.keys(userData.user.skills);
  // Progressbar
  const progressOuterBarDiv = document.getElementById("progressOuterBarDiv");
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
    skillLvl.innerText = "Lvl " + userData.user.skills[listOfSkills[i]].lvl;

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

async function initInventory() {
  showEquippedItems();
  const equipButton = document.getElementById("equipItem");
  equipButton.addEventListener("click", function () {
    equipItem(itemClicked);
    showEquippedItems();
    // etter equipped items er oppdatert, oppdater liste over equipped items
  });
  const inventorySlots = document.getElementsByClassName("itemCategoryButton");
  for (let i = 0; i < inventorySlots.length; i++) {
    inventorySlots[i].addEventListener("click", function (event) {
      const itemCategory = event.target.innerText.toLowerCase();
      showItemsInventory(itemCategory);
    });
  }
}

async function initShop() {
  const userData = await getUserData(userLoginId);
  const sellButton = document.getElementById("sellButton");
  sellButton.addEventListener("click", function () {
    const itemsEquipped = Object.values(userData.user.equipped);
    let itemIsEquipped = false;
    for (let j = 0; j < itemsEquipped.length; j++) {
      if (itemsEquipped[j] == null) continue;
      if (itemsEquipped[j].name == itemClicked) {
        itemIsEquipped = true;
        alert("Cant sell equipped item!");
      } else {
        if (!itemIsEquipped) {
          sellItem(itemClicked);
        }
      }
    }
  });
  const inventorySlots = document.getElementsByClassName("itemCategoryButton");
  for (let i = 0; i < inventorySlots.length; i++) {
    inventorySlots[i].addEventListener("click", function (event) {
      const itemCategory = event.target.innerText.toLowerCase();
      showItemsInventory(itemCategory);
    });
  }
  // const buyButton = document.getElementById("buyButton");
  // const sellButton = document.getElementById("sellButton");
  // sellButton.addEventListener("click", function () {
  //   // equipItem(itemClicked);
  // });
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
  clearInterval(skillInterval);

  skillInterval = setInterval(async function () {
    try {
      // add resources to be added into inventory later
      leveledUp = false;
      let skillLvl = document.getElementById("skillLvl_" + aSkill);
      let xpIncrease = 12;

      // fetchData = await userData(userLoginId);
      const userData = await getUserData(userLoginId);

      currentXp = userData.user.skills[aSkill].xp;
      oldLvl = userData.user.skills[aSkill].lvl;
      currentXp += xpIncrease;
      // regner ut resterende xp før den er oppdatert i tilfelle den lvl opp, regner vi på feil xå og thresh hold
      xpThreshHold = userData.user.skills[aSkill].xpThreshHold;
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
    // fetchData = await userData(userLoginId); // henter ny data for å oppdatere verdier når du logger inn
    const userData = await getUserData(userLoginId); // henter ny data for å oppdatere verdier når du logger inn

    xpIncrease = userData.user.skills[skillName].xp * (150 / userData.user.skills[skillName].xpThreshHold);
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

async function showEquippedItems() {
  const userData = await getUserData(userLoginId);
  let equippedItemsArr = Object.keys(userData.user.equipped);

  for (let i = 0; i < equippedItemsArr.length; i++) {
    const itemType = equippedItemsArr[i];
    const h1 = document.getElementById(itemType + "H1");
    const p = document.getElementById(itemType.toString() + "P");
    h1.innerText = captializeFirstLetter(itemType);

    const equippedItem = userData.user.equipped[itemType];

    if (equippedItem != null) {
      if (equippedItem.itemCategory === "weapon") {
        p.innerText = equippedItem.name + "\n" + "Level:" + equippedItem.lvlReq + "\n" + "Attack::" + equippedItem.attack;
      } else {
        p.innerText = equippedItem.name + "\n" + "Level:" + equippedItem.lvlReq + "\n" + "Defense" + equippedItem.defense;
      }
    }
  }
}

async function showItemsInventory(inventoryCategory) {
  const userData = await getUserData(userLoginId);
  // which slot was clicked
  const inventorySlots = document.getElementsByClassName("inventorySlotsDiv");
  for (let i = 0; i < inventorySlots.length; i++) {
    const inventorySlot = inventorySlots[i];
    inventorySlot.addEventListener("click", function (event) {
      itemClicked = inventorySlot.innerText.split("\n");
      itemClicked = itemClicked[0];
    });
    inventorySlot.innerText = "";
  }

  // info for each item in slot
  const itemTypes = Object.keys(userData.user.inventory[inventoryCategory]);
  for (let i = 0; i < itemTypes.length; i++) {
    if (itemTypes[i] === "inventoryCategory") continue;
    const items = userData.user.inventory[inventoryCategory][itemTypes[i]];
    for (let j = 0; j < items.length; j++) {
      const item = items[j];
      inventorySlots[i].innerText = item.name + "\n" + "Level: " + item.lvlReq;
    }
  }
}
async function showItemsShop(inventoryCategory) {
  const userData = await getUserData(userLoginId);
  // which slot was clicked
  const inventorySlots = document.getElementsByClassName("inventorySlotsDiv");
  for (let i = 0; i < inventorySlots.length; i++) {
    const inventorySlot = inventorySlots[i];
    inventorySlot.addEventListener("click", function (event) {
      itemClicked = inventorySlot.innerText.split("\n");
      itemClicked = itemClicked[0];
    });
    inventorySlot.innerText = "";
  }

  // info for each item in slot
  const itemTypes = Object.keys(userData.user.inventory[inventoryCategory]);
  for (let i = 0; i < itemTypes.length; i++) {
    if (itemTypes[i] === "inventoryCategory") continue;
    const items = userData.user.inventory[inventoryCategory][itemTypes[i]];
    for (let j = 0; j < items.length; j++) {
      const item = items[j];
      inventorySlots[i].innerText = item.name + "\n" + "Level: " + item.lvlReq;
    }
  }
}

function captializeFirstLetter(aName) {
  let firstLetter = aName.charAt(0).toUpperCase();
  let rest = aName.slice(1);
  return firstLetter + rest;
}

// ---------------- Server requests ----------------------

async function updateXp(skillName, currentXp) {
  const updatedSkillXp = {
    name: skillName,
    xp: currentXp,
  };

  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ updatedSkillXp, userLoginId }),
  };
  try {
    // const response = await fetch(`http://localhost:8080/game/${skillName}`, requestOptions);
    // const response = await fetch(`https://semesterproject-8m7h.onrender.com/game/${skillName}`, requestOptions);
    const response = await fetch(`/game/xp`, requestOptions);

    if (response.status !== 200) {
      console.log("Error editing user");
      throw new Error("Server error: " + response.status);
    }
    let newData = await response.json();
    showAnimationBar(); // kjør her istedenfor?
    return newData;
  } catch (error) {
    console.log(error);
  }
}

// funksjon for å hente ut brukerdata fra db
async function getUserData() {
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
    // const response = await fetch(`/user/Psw`, requestOptions);
    const response = await fetch(`/user/usrPsw`, requestOptions);

    if (response.status != 200) {
      console.log("Error editing user");
      throw new Error("Server error: " + response.status);
    }
    // let newUserName = await response.json(); // make sure to only send the username back, so we can update and display the new name
    // return newUserName;
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

//  ---------------------- Inventory equipped ----------------------

async function equipItem(aItem) {
  // PUT request som tar verdien til variabel som er hvilket item som ble klikket på
  // kjør sjekk på server om den skal legges til eller ersatte gammel item utifra om item av samme typer er der fra før?
  const item = { equipped: aItem };
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ item, userLoginId }),
  };
  try {
    const response = await fetch(`/game/item`, requestOptions);
    if (response.status != 200) {
      console.log("Error updating equipped items");
      throw new Error("Server error: " + response.status);
    }
    // const updatedEuippedItems = await response.json();
    // return updatedEuippedItems; // henter all data fra userData så trenger vel ikke hva denne returnerer?
  } catch (error) {
    console.log(error);
  }
}

async function buyItem() {}

async function sellItem(aItem) {
  const item = { itemToSell: aItem };
  const requestOptions = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ item, userLoginId }),
  };
  try {
    const response = await fetch(`/game/item`, requestOptions);
    if (response.status != 204) {
      console.log("Error deleting item from user");
      throw new Error("Server error: " + response.status);
    }
  } catch (error) {
    console.log(error);
  }
}

/*
for å liste items etter oppdatering = showItemsInventory og showEquippedItems

shop og inventory viser invenotry i begge. så etter du selger eller kjøper et item fra shop, på initInventory fortsatt kjøres. Resources fra skilling
trenger ikke å kjøre initInventory siden du kan kun se de i inventory/ shop. Må kjøre InitInventory når du klikker på iniventory og shop. Selv om initInventory
og initShop kjøres når du klikker på shop, loader du kun shopTemplate.

shop må oppdatere inventory siden du kan selge resources fra skilling, så hvis du skiller og går rett til shop skal du kunne se de nye fiskene, oren osv...
plis gå over og fjern golbal variabler, 90% er unødvendig og trenger ikke å være global, gjorde de bare det for testing
all henting av data fra server skjer med userData() det er en POST, men egeting brukes den som get, måtte bruke POST så jeg kunne sende inn bruker id.
Hvis du får tokens til å funke istedenfor, gjør den om til en GET ig..
nulle ("") itemClicked før den får ny verdi i tilfelle man dobbelt trykker på item?
*/
