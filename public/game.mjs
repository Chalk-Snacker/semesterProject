"use strict";
let woodcuttingInterval,
  miningInterval,
  fishingInterval,
  cookingInterval,
  progressInnerBarDiv = null;

// let skills ={
//   woodcutting:1,
// }

const skills = ["woodcutting", "mining", "fishing", "cooking"];
//sett en random value nå, og når det er mulig å sende/ hente verdier fra serveren, endre variabel verdien til hva som hentes fra server
let testVar = 1;

export function loadGame() {
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
  for (let i = 0; i < skills.length; i++) {
    const skillListDiv = document.createElement("div");
    skillListDiv.classList.add("skillListDiv");
    skillListDiv.id = "skillListDiv_" + skills[i];
    // name of skill
    const skillName = document.createElement("h1");
    skillName.classList.add("skillName"); // style general for all
    skillName.innerText = skills[i];
    // xp and lvl tracking
    const lvlXpContainer = document.createElement("div");
    const skillXpBarOuterDiv = document.createElement("div");
    const skillXpBarInnerDiv = document.createElement("div");
    skillXpBarOuterDiv.id = "skillXpBarOuterDiv";
    skillXpBarInnerDiv.id = "skillXpBarInnerDiv_" + skills[i];
    // skill lvl
    const skillLvl = document.createElement("h3");
    skillLvl.classList.add("skillLvl");
    skillLvl.innerText = "lvl " + "insertlvl";
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

function woodcutting() {
  const progressOuterBarDiv = document.getElementById("progressOuterBarDiv");
  progressOuterBarDiv.style.display = "none";
  progressOuterBarDiv.style.visibility = "hidden";
  clearInterval(miningInterval);
  clearInterval(fishingInterval);
  clearInterval(cookingInterval);
  clearInterval(woodcuttingInterval);

  showAnimationBar();

  woodcuttingInterval = setInterval(function () {
    // oppdater verdier her med sjekker og alt annet ig orker ikke mer nå...

    testVar++;
    console.log("amount of wood: " + testVar);
    updateSkillLvlXpBar(skills[0], "10px");
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
    updateSkillLvlXpBar(skills[1], "10px");
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
    updateSkillLvlXpBar(skills[2], "10px");
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
    updateSkillLvlXpBar(skills[3], "10px");
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

// ---------------- Button functions ----------------------

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
