"use strict";
import { loadTemplates, loginUser } from "./gameLogin.mjs";
import { captializeFirstLetter } from "./utilities.mjs";

let newLvl,
  currentXp,
  oldLvl,
  skillInterval,
  xpThreshHold,
  userLoginId,
  remainder,
  listOfSkills,
  itemClicked = null;

let leveledUp = false; // trenger vel ikke å være global?

async function switchgameplay(gameplayType) {
  // load correct gameplay template
  const gameplayContainer = document.getElementById("gameplayContainer");
  gameplayContainer.innerHTML = "";
  gameplayContainer.appendChild(document.importNode(document.getElementById(gameplayType).content, true));
  clearInterval(skillInterval);
  const userData = await getUserData(userLoginId);
  const username = document.getElementById("username");
  username.innerText = userData.user.nick;
  // run code depending on template
  switch (gameplayType) {
    case "battleTemplate":
      initBattle();
      break;
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

// ---------------- init ----------------
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
  const comingSoon = document.getElementById("comingSoon");
  comingSoon.innerText = "Coming soon";
}
async function initInventory() {
  showEquippedItems();
  const equipButton = document.getElementById("equipItem");
  equipButton.addEventListener("click", function () {
    equipItem(itemClicked);
    showEquippedItems();
    // etter equipped items er oppdatert, oppdater liste over equipped items
  });
  const itemCategoryButton = document.getElementsByClassName("itemCategoryButton");
  for (let i = 0; i < itemCategoryButton.length; i++) {
    itemCategoryButton[i].addEventListener("click", function (event) {
      const itemCategory = event.target.innerText.toLowerCase();
      showItems(itemCategory);
    });
  }
}
async function initShop() {
  const userData = await getItemsFromInventory();

  const sellButton = document.getElementById("sellButton");
  sellButton.addEventListener("click", function () {
    console.log(userData);
    const itemsEquipped = Object.values(userData.inventoryData.equipped);

    let itemIsEquipped = false;
    for (let j = 0; j < itemsEquipped.length; j++) {
      if (itemsEquipped[j] == null) continue;
      if (itemsEquipped[j].name == itemClicked) {
        itemIsEquipped = true;
        alert("Cant sell equipped item!");
      } else {
        if (!itemIsEquipped) {
          sellItem(itemClicked);
          console.log(itemClicked);
        }
      }
    }
    for (let j = 0; j < itemsEquipped.length; j++) {
      sellItem(itemClicked);
      console.log(itemClicked);
    }
  });

  const buyButton = document.getElementById("buyButton");
  buyButton.addEventListener("click", function () {
    buyItem(itemClicked);
  });

  const inventorySlots = document.getElementsByClassName("itemCategoryButton");
  for (let i = 0; i < inventorySlots.length; i++) {
    inventorySlots[i].addEventListener("click", function (event) {
      const itemCategory = event.target.innerText.toLowerCase();
      showItems(itemCategory);
      showItemsShop(itemCategory);
    });
  }
}
async function initSettings() {
  const editUserButton = document.getElementById("editUserButton");
  const deleteUserButton = document.getElementById("deleteUserButton");
  const logoutButton = document.getElementById("logoutButton");

  editUserButton.addEventListener("click", async function () {
    const newUserName = document.getElementById("textField5").value;
    const newUserPassword = document.getElementById("textField6").value;
    if (newUserName == "" || newUserPassword == "") {
      alert("Please fill out all fields");
      return;
    } else {
      await updateUserInformation(newUserName, newUserPassword);
      switchgameplay("idleTemplate");
      localStorage.removeItem("authToken");
    }
  });
  deleteUserButton.addEventListener("click", async function () {
    localStorage.removeItem("authToken");
    deleteUser();
    loadTemplates("loginTemplate");
    loginUser();
  });
  logoutButton.addEventListener("click", function () {
    localStorage.removeItem("authToken");
    loadTemplates("loginTemplate");
    loginUser();
  });
}

// ---------------- Skill function ----------------
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

// ---------------- shop/ inventory ----------------
async function showEquippedItems() {
  const userData = await getItemsFromInventory();
  let equippedItemsArr = Object.keys(userData.inventoryData.equipped);
  for (let i = 0; i < equippedItemsArr.length; i++) {
    const itemType = equippedItemsArr[i];
    const h1 = document.getElementById(itemType + "H1");
    const p = document.getElementById(itemType.toString() + "P");
    h1.innerText = captializeFirstLetter(itemType);
    const equippedItem = userData.inventoryData.equipped[itemType][itemType];
    if (equippedItem != null) {
      if (equippedItem.itemCategory === "weapon") {
        p.innerText = equippedItem.name + "\n" + "Level:" + equippedItem.lvlReq + "\n" + "Attack::" + equippedItem.attack;
      } else {
        p.innerText = equippedItem.name + "\n" + "Level:" + equippedItem.lvlReq + "\n" + "Defense" + equippedItem.defense;
      }
    }
  }
}
async function showItems(inventoryCategory) {
  const inventoryData = await getItemsFromInventory();
  const inventorySlots = document.getElementsByClassName("inventorySlotsDiv");
  const inventory = inventoryData.inventoryData[inventoryCategory];
  for (let i = 0; i < inventorySlots.length; i++) {
    const inventorySlot = inventorySlots[i];
    inventorySlot.addEventListener("click", function (event) {
      itemClicked = inventorySlot.innerText.split("\n");
      itemClicked = itemClicked[0];
      console.log(itemClicked);
    });
    inventorySlot.innerText = "";
  }

  let slotIndex = 0;
  if (inventory) {
    const itemSets = Object.keys(inventory);
    for (let i = 0; i < itemSets.length; i++) {
      let itemSlot = inventory[Object.keys(inventory)[i]];
      const itemSlotArr = Object.keys(itemSlot);
      for (let j = 0; j < itemSlotArr.length; j++) {
        const item = inventory[Object.keys(inventory)[i]][itemSlotArr[j]];
        if (item != null) {
          inventorySlots[slotIndex].innerText = item.name + "\n" + "Level: " + item.lvlReq + "\n";
          slotIndex++;
        }
      }
    }
  }
}
async function showItemsShop(shopCategory) {
  const shopData = await getItemsFromShop();
  const shopItemSlots = document.getElementsByClassName("itemTierDiv");
  for (let i = 0; i < shopItemSlots.length; i++) {
    const shopItemSlot = shopItemSlots[i];
    shopItemSlot.addEventListener("click", function (event) {
      itemClicked = shopItemSlot.innerText.split("\n");
      itemClicked = itemClicked[0];
      console.log(itemClicked);
    });
    shopItemSlot.innerText = "";
  }

  const shopTierDiv = document.getElementsByClassName("shopTierDiv");

  for (let i = 0; i < shopTierDiv.length; i++) {
    const shopItemSlot = shopTierDiv[i].getElementsByClassName("itemTierDiv");
    const itemQuality = Object.keys(shopData.shopData[i][shopCategory]);
    const itemSet = shopData.shopData[i][shopCategory][itemQuality];

    for (let j = 0; j < shopItemSlot.length; j++) {
      if (itemSet) {
        const itemSlot = Object.keys(itemSet);
        if (j < Object.keys(itemSlot).length) {
          const item = itemSet[itemSlot[j]];
          shopItemSlot[j].innerText = item.name + "\n" + item.info;
        } else {
          shopItemSlot[j].innerText = "";
        }
      }
    }
  }
}

// ---------------- Server requests ----------------

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
    const response = await fetch(`/user/usrPsw`, requestOptions);

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
async function getUserData() {
  let requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("authToken")}` },
    body: JSON.stringify(userLoginId),
    credentials: "include",
  };
  try {
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
async function getItemsFromShop() {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  try {
    const response = await fetch("/game/shop", requestOptions);
    if (response.status != 200) {
      console.log("Error getting items from shop!");
      throw new Error("Servererror: " + response.status);
    }
    let data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
async function getItemsFromInventory() {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userLoginId),
  };
  try {
    const response = await fetch("/game/inventory", requestOptions);
    if (response.status != 200) {
      console.log("Error getting items from inventory!");
      throw new Error("Servererror: " + response.status);
    }
    let data = await response.json();
    return data;
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
    const response = await fetch(`/game/inventory`, requestOptions);
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
async function buyItem(aItem) {
  const item = { itemToBuy: aItem };

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ item, userLoginId }),
  };
  try {
    const response = await fetch(`game/shop`, requestOptions);
    if (response.status != 200) {
      console.log("Error purchasing item from shop");
      throw new Error("Server error: " + response.status);
    }
  } catch (error) {
    console.log(error);
  }
}
async function sellItem(aItem) {
  const item = { itemToSell: aItem };

  const requestOptions = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ item, userLoginId }),
  };
  try {
    const response = await fetch(`/game/inventory`, requestOptions);
    if (response.status != 204) {
      console.log("Error deleting item from user");
      throw new Error("Server error: " + response.status);
    }
  } catch (error) {
    console.log(error);
  }
}
