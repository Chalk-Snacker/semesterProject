"use strict";
import { customFetch } from "./utilities.mjs";
import { showItems } from "./inventory.mjs";

let itemClicked = null;

export async function initShop() {
  const userData = await customFetch(
    "GET",
    null,
    { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("authToken")}` },
    "/game/inventory"
  );
  let equippedItemsArr = Object.keys(userData.inventoryData.equipped);
  const sellButton = document.getElementById("sellButton");
  sellButton.addEventListener("click", async function () {
    const itemsEquipped = Object.values(userData.inventoryData.equipped);
    const itemSlots = Object.keys(itemsEquipped);
    let isEquipped = false;

    for (let j = 0; j < itemsEquipped.length; j++) {
      const itemEquipped = itemsEquipped[itemSlots[j]][equippedItemsArr[j]];
      if (itemEquipped && itemEquipped.name === itemClicked) {
        isEquipped = true;
        break;
      }
    }
    if (!isEquipped) {
      await customFetch(
        "DELETE",
        JSON.stringify({ item: itemClicked }),
        { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("authToken")}` },
        "/game/inventory"
      );
      return;
    }
  });

  const buyButton = document.getElementById("buyButton");
  buyButton.addEventListener("click", async function () {
    // buyItem(itemClicked);
    await customFetch(
      "POST",
      JSON.stringify({ item: itemClicked }),
      { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("authToken")}` },
      "/game/shop"
    );
    return;
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

async function showItemsShop(shopCategory) {
  const shopData = await customFetch("GET", null, { "Content-Type": "application/json" }, "/game/shop");

  const shopItemSlots = document.getElementsByClassName("itemTierDiv");
  for (let i = 0; i < shopItemSlots.length; i++) {
    const shopItemSlot = shopItemSlots[i];
    shopItemSlot.addEventListener("click", function (event) {
      itemClicked = shopItemSlot.innerText.split("\n");
      itemClicked = itemClicked[0];
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
