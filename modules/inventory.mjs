"use strict";

export const inventory = {
  id: null,
  armor: { itemSetOne: {}, itemSetTwo: {}, itemSetThree: {}, itemSetFour: {}, itemSetFive: {} },
  weapon: { itemSetOne: {}, itemSetTwo: {}, itemSetThree: {}, itemSetFour: {}, itemSetFive: {} },
  consumables: { itemSetOne: {}, itemSetTwo: {}, itemSetThree: {}, itemSetFour: {} },
  resources: {},
  equipped: {
    helm: {},
    chestPlate: {},
    cape: {},
    gauntlets: {},
    legs: {},
    shoes: {},
    shield: {},
    weapon: {},
  },
};

// ----------------------- ITEMS -----------------------

export const shopArmorSet = {
  itemSetOne: {
    helm: { name: "Dr Pepper cap", defense: 2, lvlReq: 1, itemCategory: "armor", price: 0, info: "Better than nothing" },
    chestPlate: { name: "Parker Square shirt", defense: 2, lvlReq: 1, itemCategory: "armor", price: 0, info: "Better than nothing" },
    gauntlets: { name: "Disposable gloves", defense: 2, lvlReq: 1, itemCategory: "armor", price: 0, info: "Better than nothing" },
    legs: { name: "Slacks", defense: 2, lvlReq: 1, itemCategory: "armor", price: 0, info: "Better than nothing" },
    shoes: { name: "Hobo slippers", defense: 2, lvlReq: 1, itemCategory: "armor", price: 0, info: "Better than nothing" },
    shield: { name: "Torn umbrella", defense: 2, lvlReq: 1, itemCategory: "armor", price: 0, info: "Better than nothing" },
    cape: { name: "bed sheet", defense: 2, lvlReq: 1, itemCategory: "armor", price: 0, info: "Better than nothing" },
  },
  itemSetTwo: {
    helm: { name: "BronzeHelm", defense: 10, lvlReq: 3, itemCategory: "armor", price: 0, info: "Very cool item" },
    chestPlate: { name: "Bronze chestplate", defense: 10, lvlReq: 3, itemCategory: "armor", price: 0, info: "Very cool item" },
    gauntlets: { name: "Bronze gauntlets", defense: 10, lvlReq: 3, itemCategory: "armor", price: 0, info: "Very cool item" },
    legs: { name: "Bronze legs", defense: 10, lvlReq: 3, itemCategory: "armor", price: 0, info: "Very cool item" },
    shoes: { name: "Bronze shoes", defense: 10, lvlReq: 3, itemCategory: "armor", price: 0, info: "Very cool item" },
    shield: { name: "Bronze shield", defense: 20, lvlReq: 3, itemCategory: "armor", price: 0, info: "Very cool item" },
  },
  itemSetThree: {
    helm: { name: "Iron helm", defense: 23, lvlReq: 7, itemCategory: "armor", price: 0, info: "Even cooler item!" },
    chestPlate: { name: "Iron chestplate", defense: 23, lvlReq: 7, itemCategory: "armor", price: 0, info: "Even cooler item!" },
    gauntlets: { name: "Iron gauntlets", defense: 23, lvlReq: 7, itemCategory: "armor", price: 0, info: "Even cooler item!" },
    legs: { name: "Iron legs", defense: 23, lvlReq: 7, itemCategory: "armor", price: 0, info: "Even cooler item!" },
    shoes: { name: "Iron shoes", defense: 23, lvlReq: 7, itemCategory: "armor", price: 0, info: "Even cooler item!" },
    shield: { name: "Iron shield", defense: 46, lvlReq: 7, itemCategory: "armor", price: 0, info: "Even cooler item!" },
  },
  itemSetFour: {
    helm: { name: "Steel helm", defense: 39, lvlReq: 12, itemCategory: "armor", price: 0, info: "Based item" },
    chestPlate: { name: "Steel chestplate", defense: 39, lvlReq: 12, itemCategory: "armor", price: 0, info: "Based item" },
    gauntlets: { name: "Steel gauntlets", defense: 39, lvlReq: 12, itemCategory: "armor", price: 0, info: "Based item" },
    legs: { name: "Steel legs", defense: 39, lvlReq: 12, itemCategory: "armor", price: 0, info: "Based item" },
    shoes: { name: "Steel shoes", defense: 39, lvlReq: 12, itemCategory: "armor", price: 0, info: "Based item" },
    shield: { name: "Steel shield", defense: 78, lvlReq: 12, itemCategory: "armor", price: 0, info: "Based item" },
  },
  itemSetFive: {
    cape: { name: "Fun Fun Cloth", defense: 248, lvlReq: 32, itemCategory: "armor", price: 0, info: "Mysterious Convenient Kerchief" },
  },
};

export const shopWeaponSet = {
  itemSetOne: {
    sword: { name: "Homemade wooden butterknife", attack: 5, lvlReq: 1, itemCategory: "weapon", price: 0, info: "Moms favorite" },
  },
  itemSetTwo: {
    sword: { name: "Bronze sword", attack: 17, lvlReq: 3, itemCategory: "weapon", price: 0, info: "Very cool item" },
    axe: { name: "Bronze axe", attack: 17, lvlReq: 3, itemCategory: "weapon", price: 0, info: "Very cool item" },
    mace: { name: "Bronze maze", attack: 17, lvlReq: 3, itemCategory: "weapon", price: 0, info: "Very cool item" },
    greatSword: { name: "Bronze greatsword", attack: 28, lvlReq: 3, itemCategory: "weapon", price: 0, info: "Very cool item" },
    greatAxe: { name: "Bronze greataxe", attack: 28, lvlReq: 3, itemCategory: "weapon", price: 0, info: "Very cool item" },
    greatMace: { name: "Bronze greatmace", attack: 28, lvlReq: 3, itemCategory: "weapon", price: 0, info: "Very cool item" },
  },
  itemSetThree: {
    sword: { name: "Iron sword", attack: 36, lvlReq: 7, itemCategory: "weapon", price: 0, info: "Even cooler item!" },
    axe: { name: "Iron axe", attack: 36, lvlReq: 7, itemCategory: "weapon", price: 0, info: "Even cooler item!" },
    mace: { name: "Iron maze", attack: 36, lvlReq: 7, itemCategory: "weapon", price: 0, info: "Even cooler item!" },
    greatSword: { name: "Iron greatsword", attack: 52, lvlReq: 7, itemCategory: "weapon", price: 0, info: "Even cooler item!" },
    greatAxe: { name: "Iron greataxe", attack: 52, lvlReq: 7, itemCategory: "weapon", price: 0, info: "Even cooler item!" },
    greatMace: { name: "Iron greatmace", attack: 52, lvlReq: 7, itemCategory: "weapon", price: 0, info: "Even cooler item!" },
  },
  itemSetFour: {
    sword: { name: "Steel sword", attack: 54, lvlReq: 12, itemCategory: "weapon", price: 0, info: "Based item" },
    axe: { name: "Steel axe", attack: 54, lvlReq: 12, itemCategory: "weapon", price: 0, info: "Based item" },
    mace: { name: "Steel maze", attack: 54, lvlReq: 12, itemCategory: "weapon", price: 0, info: "Based item" },
    greatSword: { name: "Steel greatsword", attack: 72, lvlReq: 12, itemCategory: "weapon", price: 0, info: "Based item" },
    greatAxe: { name: "Steel greataxe", attack: 72, lvlReq: 12, itemCategory: "weapon", price: 0, info: "Based item" },
    greatMace: { name: "Steel greatmace", attack: 72, lvlReq: 12, itemCategory: "weapon", price: 0, info: "Based item" },
  },
  itemSetFive: {
    staff: { name: "+99 reinforced wooden stick", attack: 9999, lvlReq: 1, itemCategory: "weapon", price: 0, info: "Ordinary Stick?" },
  },
};

export const shopConsumableSet = {
  itemSetOne: {
    lesser: { name: "Pay attention pill", xp: 5, lvlReq: 1, itemCategory: "consumable", price: 0, info: "Brain stimulate [xpPotion]" },
    greater: { name: "Lifes shortcut", xp: 12, lvlReq: 7, itemCategory: "consumable", price: 0, info: "Grinding time xpPotion]" },
  },
  itemSetTwo: {
    lesser: {
      name: "Soy pot",
      healing: 4,
      lvlReq: 1,
      itemCategory: "consumable",
      price: 0,
      info: "Will slightly increase hp, but downgrade masculinity [healingPotion]",
    },
    greater: { name: "Jameson Crested", healing: 14, lvlReq: 7, itemCategory: "consumable", price: 0, info: "Bottoms up [healingPotion]" },
  },
  itemSetThree: {
    lesser: { name: "Trenacetate", attack: 3, lvlReq: 1, itemCategory: "consumable", price: 0, info: "Juice [damagePotion]" },
    greater: { name: "Big juicer", attack: 10, lvlReq: 7, itemCategory: "consumable", price: 0, info: "Beeg juice [damagePotion]" },
  },
  itemSetFour: {
    lesser: { name: "Gatorade", mana: 10, lvlReq: 1, itemCategory: "consumable", price: 0, info: "Liquid anti oom [manaPotion]" },
    greater: { name: "Powerade", mana: 25, lvlReq: 7, itemCategory: "consumable", price: 0, info: "Refreshed in liquid form [manaPotion]" },
  },
};
