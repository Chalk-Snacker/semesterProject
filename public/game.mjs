"use strict";
// import { loadTemplates, loginUser } from "./gameLogin.mjs";
import { customFetch } from "./utilities.mjs";
import { initidle, skillInterval } from "./idle.mjs";
import { initInventory } from "./inventory.mjs";
import { initShop } from "./shop.mjs";
import { initSettings } from "./settings.mjs";
import { initBattle } from "./battle.mjs";

// let skillInterval = null;
let userLoginId = null;

export async function switchgameplay(gameplayType) {
  clearInterval(skillInterval);
  const gameplayContainer = document.getElementById("gameplayContainer");
  gameplayContainer.innerHTML = "";
  gameplayContainer.appendChild(document.importNode(document.getElementById(gameplayType).content, true));
  // clearInterval(skillInterval);

  const userData = await customFetch(
    "GET",
    null,
    { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("authToken")}` },
    "/game/profile"
  );
  const username = document.getElementById("username");
  username.innerText = userData.user.nick;
  switch (gameplayType) {
    case "battleTemplate":
      // clearInterval(skillInterval);
      initBattle();
      break;
    case "idleTemplate":
      // clearInterval(skillInterval);
      initidle();
      break;
    case "inventoryTemplate":
      // clearInterval(skillInterval);
      initInventory();
      break;
    case "shopTemplate":
      // clearInterval(skillInterval);
      initShop();
      break;
    case "settingsTemplate":
      // clearInterval(skillInterval);
      initSettings();
      break;
  }
}

export async function loadGame(userId) {
  userLoginId = userId;

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
