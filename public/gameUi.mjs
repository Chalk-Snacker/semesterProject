"use strict";
let woodcuttingInterval,
  miningInterval,
  fishingInterval,
  cookingInterval,
  progressOuterBarDiv,
  progressInnerBarDiv = null;

// let skills ={
//   woodcutting:1,
// }

let skills = ["woodcutting", "mining", "fishing", "cooking"];
//sett en random value nå, og når det er mulig å sende/ hente verdier fra serveren, endre variabel verdien til hva som hentes fra server
let testVar = 1;

export function initIdle(aContainer) {
  // Creates idle UI:
  let idleTopDiv = document.createElement("div");
  let idleTopLeftDiv = document.createElement("div");
  let idleTopRightDiv = document.createElement("div");
  idleTopDiv.id = "idleTopDiv";
  idleTopLeftDiv.id = "idleTopLeftDiv";
  idleTopRightDiv.id = "idleTopRightDiv";

  let idleBottomDiv = document.createElement("div");
  idleBottomDiv.id = "idleBottomDiv";
  aContainer.appendChild(idleTopDiv);
  aContainer.appendChild(idleBottomDiv);
  idleTopDiv.appendChild(idleTopLeftDiv);
  idleTopDiv.appendChild(idleTopRightDiv);

  // Progressbar
  let progressOuterBarDiv = document.createElement("div");
  let progressInnerBarDiv = document.createElement("div");
  progressOuterBarDiv.id = "progressOuterBarDiv";
  progressInnerBarDiv.id = "progressInnerBarDiv";
  idleTopRightDiv.appendChild(progressOuterBarDiv);
  progressOuterBarDiv.appendChild(progressInnerBarDiv);
  progressOuterBarDiv.style.visibility = "hidden";
  progressOuterBarDiv.style.display = "none";

  // Skill list
  // lag så mange div du trenger for hvert skill med for loop senere
  // lagre antall skills på serveren slik som i planteoppgaven?
  // skriv det heller om senere, bare kod slik at du har spillet "ferdig" og kan heller oppdatere det senere for server

  /*
  se over koden under, siste som ble gjort og er ikke testet
  let skillListDiv = document.createElement("div");
  for (let i = 0; i < skills.length; i++) {
    skillListDiv.id = "skillListDiv";
    idleTopLeftDiv.appendChild(skillListDiv);
  }

  */

  // --- Buttons ---

  // Woodcutting button
  let woodcuttingButton = document.createElement("button");
  woodcuttingButton.id = "woodCuttingButton";
  woodcuttingButton.addEventListener("click", woodcutting);
  idleBottomDiv.appendChild(woodcuttingButton);

  // Mining button
  let miningButton = document.createElement("button");
  miningButton.id = "miningButton";
  miningButton.addEventListener("click", mining);
  idleBottomDiv.appendChild(miningButton);

  // Fishing button
  let fishingButton = document.createElement("button");
  fishingButton.id = "fishingButton";
  fishingButton.addEventListener("click", fishing);
  idleBottomDiv.appendChild(fishingButton);

  // Cooking button
  let cookingButton = document.createElement("button");
  cookingButton.id = "cookingButton";
  cookingButton.addEventListener("click", cooking);
  idleBottomDiv.appendChild(cookingButton);
  // ---- END OF IDLE UI ----

  // Creates idle gameplay

  // create a list to showcase all the stats (woodcutting, mining ...)
  // push in a list tracking stats, all should be lvl 1 deafault
  // push in idle icons in bottom part
  // push in a background or random image for rightside
}

export function initBattle() {
  // asdf
}

export function initInventory(aContainer) {
  let inventoryLeftDiv = document.createElement("div");
  let inventoryRightDiv = document.createElement("div");
  inventoryLeftDiv.id = "inventoryLeftDiv";
  inventoryRightDiv.id = "inventoryRightDiv";

  aContainer.appendChild(inventoryLeftDiv);
  aContainer.appendChild(inventoryRightDiv);

  // create the rest of inventory system
}

export function initShop() {
  // asdf
}

export function initSettings() {
  // asdf
}

// ---------------- Skill functions ----------------------

function woodcutting() {
  let progressOuterBarDiv = document.getElementById("progressOuterBarDiv");
  progressOuterBarDiv.style.display = "none";
  progressOuterBarDiv.style.visibility = "hidden";
  clearInterval(miningInterval);
  clearInterval(fishingInterval);
  clearInterval(cookingInterval);
  clearInterval(woodcuttingInterval); // denne er temp, siden det er mulig å klikke på den foreløpig mens et interval allerede kjører, lage det ekstra interval pr klikk

  showAnimationBar();

  woodcuttingInterval = setInterval(function () {
    // oppdater verdier her med sjekker og alt annet ig orker ikke mer nå...

    testVar++;
    console.log("amount of wood: " + testVar);
  }, 5000);
}

function mining() {
  let progressOuterBarDiv = document.getElementById("progressOuterBarDiv");
  progressOuterBarDiv.style.display = "none";
  progressOuterBarDiv.style.visibility = "hidden";
  clearInterval(woodcuttingInterval);
  clearInterval(fishingInterval);
  clearInterval(cookingInterval);
  showAnimationBar();

  miningInterval = setInterval(function () {
    console.log("mining test");
  }, 5000);
}

function fishing() {
  let progressOuterBarDiv = document.getElementById("progressOuterBarDiv");
  progressOuterBarDiv.style.display = "none";
  progressOuterBarDiv.style.visibility = "hidden";
  clearInterval(woodcuttingInterval);
  clearInterval(miningInterval);
  clearInterval(cookingInterval);
  showAnimationBar();

  fishingInterval = setInterval(function () {
    console.log("fishing test");
  }, 5000);
}

function cooking() {
  let progressOuterBarDiv = document.getElementById("progressOuterBarDiv");
  progressOuterBarDiv.style.display = "none";
  progressOuterBarDiv.style.visibility = "hidden";
  clearInterval(woodcuttingInterval);
  clearInterval(fishingInterval);
  clearInterval(miningInterval);
  showAnimationBar();

  cookingInterval = setInterval(function () {
    console.log("cooking test");
  }, 5000);
}

function showAnimationBar() {
  progressOuterBarDiv = document.getElementById("progressOuterBarDiv");
  progressInnerBarDiv = document.getElementById("progressInnerBarDiv");
  progressInnerBarDiv.style.animation = "none";

  // Force a reflow
  void progressInnerBarDiv.offsetWidth;

  progressInnerBarDiv.style.animation = "progress-animation 5s linear infinite";
  progressOuterBarDiv.style.display = "block";
  progressOuterBarDiv.style.visibility = "visible";
}
