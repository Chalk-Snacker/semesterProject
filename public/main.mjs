"use strict";

import { initIdle, initBattle, initInventory, initShop, initSettings } from "./gameUi.mjs";

// main function
const testPlayer = {
  playerEmail: "testMail",
  playerPsw: "testPassWrD21132",
  playerNick: "testPlayer",
};
const testPlayerUpdated = {
  playerEmail: "testMailTest",
  playerPsw: "testPassWrD21132Test",
  playerNick: "Player1",
};

// const testPlayer2 = {
//   playerEmail: "testMail2",
//   playerPsw: "testPassWrD21132",
//   playerNick: "testPlayer2",
// };
export function loadGame() {
  testCreateUser(testPlayer);
  // editUser(testPlayerUpdated);
  // testCreateUsers(testPlayer2);
  // deleteCreateUsers("testPlayer");

  let containerOuter = document.getElementById("containerBackgroundOuter");
  let containerInner = document.getElementById("containerBackgroundInner");
  let containerGameplay = document.getElementById("containerGameplayZone");

  const div = document.createElement("div");
  containerOuter.appendChild(div);
  containerInner.appendChild(div);
  containerGameplay.appendChild(div);

  // -------- Main Buttons on side --------

  // battle button
  let battleButton = document.createElement("button");
  battleButton.id = "battleButton";
  battleButton.addEventListener("click", function () {});
  containerInner.appendChild(battleButton);

  // inventory button
  let InventoryButton = document.createElement("button");
  InventoryButton.id = "inventoryButton";
  InventoryButton.addEventListener("click", inventory);

  containerInner.appendChild(InventoryButton);

  // shop button
  let shopButton = document.createElement("button");
  shopButton.id = "shopButton";
  shopButton.addEventListener("click", shop);

  containerInner.appendChild(shopButton);

  // idle button
  let idleButton = document.createElement("button");
  idleButton.id = "idleButton";
  idleButton.addEventListener("click", idle);
  containerInner.appendChild(idleButton);

  // settings button
  let settingsButton = document.createElement("button");
  settingsButton.innerText = "settings";
  settingsButton.id = "settingsButton";
  settingsButton.addEventListener("click", settings);
  containerInner.appendChild(settingsButton);
  // ------------ End of Buttons ---------

  // running UI functions
  initBattle(div);
  initInventory(div);
  initShop(div);
  initIdle(div);
  initSettings(div);

  console.log(document.getElementsByTagName("*").length);
}

// USER FUNCTIONS
async function testCreateUser() {
  let requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(testPlayer),
  };
  try {
    let response = await fetch("http://localhost:8080/user", requestOptions);
    if (response.status != 201) {
      console.log(response.status);
      console.log("Error creating user");
      throw new Error("Server error: " + response.status);
    }
  } catch (error) {
    console.log(error);
  }
}

// TESTING STATIC OBJECT
// async function testCreateUser(aPlayer) {
//   let requestOptions = {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(aPlayer),
//   };
//   try {
//     let response = await fetch("http://localhost:8080/user", requestOptions);
//     if (response.status != 201) {
//       console.log(response.status);
//       console.log("Error creating user");
//       throw new Error("Server error: " + response.status);
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }

async function deleteUser(playerName) {
  let requestOptions = {
    method: "DELETE",
  };
  try {
    let response = await fetch(`http://localhost:8080/user/${playerName}`, requestOptions);
    if (response.status != 200) {
      console.log("Error deleting user");
      throw new Error("Server error: " + response.status);
    }
  } catch (error) {
    console.log(error);
  }
}

async function editUser(playerName) {
  let requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(testPlayerUpdated),
  };
  try {
    let response = await fetch(`http://localhost:8080/user/${playerName}`, requestOptions);
    if (response.status != 200) {
      console.log("Error editing user");
      throw new Error("Server error: " + response.status);
    }
  } catch (error) {
    console.log(error);
  }
}
// ----------------------------------------------------------------------------------------------------

// BUTTON FUNCTIONS:

function battle() {
  // css hidden toggle ting her
}

function inventory() {
  // hides the progressbar so that it doesnt automatically runs when going back to idle
  progressOuterBarDiv.style.visibility = "hidden";
  progressOuterBarDiv.style.display = "none";

  // rest of function
  let test1 = document.getElementById("idleTopDiv");
  let test2 = document.getElementById("idleBottomDiv");
  test1.style.display = "none";
  test1.style.visibility = "hidden";
  test2.style.display = "none";
  test2.style.visibility = "hidden";

  let test3 = document.getElementById("inventoryLeftDiv");
  let test4 = document.getElementById("inventoryRightDiv");
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
  let test1 = document.getElementById("inventoryLeftDiv");
  let test2 = document.getElementById("inventoryRightDiv");
  test1.style.display = "none";
  test1.style.visibility = "hidden";
  test2.style.display = "none";
  test2.style.visibility = "hidden";

  let test3 = document.getElementById("idleTopDiv");
  let test4 = document.getElementById("idleBottomDiv");
  test3.style.display = "block";
  test3.style.visibility = "visible";
  test4.style.display = "block";
  test4.style.visibility = "visible";

  // husk å gjøre inventory visible igjen (gjelder alle kategorier)
}
function settings() {
  // css hidden toggle ting her
}

// UI for pålogging:
// kjør dette aller først:
// formData = customerForm
// let customerForm = document.createElement("form");
// let playerEmail = document.createElement("input");
// let playerPsw = document.createElement("input");
// let playerNick = document.createElement("input");

// customerForm.appendChild("");

// bruk disse for testing før du har innlogging html del:

/*
--------------------------------------- TO DO: ---------------------------------------
1. lag liste for stats i idle
2. oppdater stats med if tester e.l. når du skal lvl opp... må vel da lage et xp system...
3. sett inn spillernavn + lvl
*/

/*
--------------------------------------- Game fixes: ---------------------------------------
1. fix the idle and inventory functions, they are a mess with variables that have horrible names, aka fix 
  the css hidden toggle stuff so its not ass
2. fix bug med at hvis du holder på å lvl et skill og trykker på samme knapp så skjer det ting. 
  Det skal ikke gå ann å trykke på knappen av samme skill mens man lvler det.
  evt så kan du cleare intervalle av samme skill (cleare alle 4 istedenfor 3)?
3. husk å gjøre alt til const, og heller let om du får feilmelding
4. make the category buttons smaller and the gameplay area bigger
5. make the layout responsive
6. trenger kanskje ikke å starte siden med idle delen, kanskje noe annet skal være der?
7. kan kanskje lage noen av div og knapper med for loop heller 
8. hvis du begynner å farme eks. woodcutting og går til inventory farmer den fortsatt // lag en egen funksjon for å stoppe farming
   så du ikke trenger å ha 100 linjer hvergang det må stoppes, og kall på den når du bytter skill å grinde eller vindu
*/
