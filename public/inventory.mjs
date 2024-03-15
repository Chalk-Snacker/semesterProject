"use strict";
import { customFetch, captializeFirstLetter, setItemClicked, getItemClicked } from "./utilities.mjs";

export async function initInventory() {
  showEquippedItems();
  const equipButton = document.getElementById("equipItem");
  equipButton.addEventListener("click", async function () {
    await customFetch(
      "PUT",
      JSON.stringify({ item: getItemClicked() }),
      { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("authToken")}` },
      "/game/inventory"
    );
    showEquippedItems();
  });
  const itemCategoryButton = document.getElementsByClassName("itemCategoryButton");
  for (let i = 0; i < itemCategoryButton.length; i++) {
    itemCategoryButton[i].addEventListener("click", function (event) {
      const itemCategory = event.target.innerText.toLowerCase();
      showItems(itemCategory);
    });
  }
}

async function showEquippedItems() {
  const userData = await customFetch(
    "GET",
    null,
    { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("authToken")}` },
    "/game/inventory"
  );

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

export async function showItems(inventoryCategory) {
  const inventoryData = await customFetch(
    "GET",
    null,
    { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("authToken")}` },
    "/game/inventory"
  );
  const inventorySlots = document.getElementsByClassName("inventorySlotsDiv");
  const inventory = inventoryData.inventoryData[inventoryCategory];
  for (let i = 0; i < inventorySlots.length; i++) {
    const inventorySlot = inventorySlots[i];
    inventorySlot.addEventListener("click", function (event) {
      setItemClicked(inventorySlot.innerText.split("\n")[0]);
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
