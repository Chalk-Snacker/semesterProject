// import { StartingItems, Spells, Consumables } from "./items.mjs";
// export class Skill {
//   constructor(skillName) {
//     this.skillName = skillName;
//     this.lvl = 1;
//     this.xp = 0;
//     this.xpThreshHold = this.lvl * 50;
//     // flytt threshhold ut fra constructor, trenger ikke å ha den i brukeren
//     // evt bytte ut xpThreshHold med xpNeededForLvlUp og endre verdien hvergang du lvl opp
//     // this.xpNeededLvlUp;
//     this.restXp = 0; // when lvl up, remaining xp will be tranfered towards next lvl
//   }
//   lvlUp2() {
//     console.log("condition met");
//     this.restXp = this.xp % this.xpThreshHold[this.lvl];
//     this.xp = this.restXp;
//     this.restXp = 0;
//     this.lvl++;
//   }
// }

// export class Inventory {
//   constructor(inventoryCategory) {
//     this.inventoryCategory = inventoryCategory;
//     switch (inventoryCategory) {
//       case "Armor":
//         (this.helm = []), (this.chestPlate = []), (this.cape = []), (this.gauntlets = []), (this.legs = []), (this.shoes = []), (this.shield = []);
//         break;
//       case "Weapons":
//         (this.sword = []),
//           (this.axe = []),
//           (this.mace = []),
//           (this.greatSword = []),
//           (this.greatAxe = []),
//           (this.greatMace = []),
//           (this.staff = []),
//           (this.bow = []);
//         break;

//       case "Spells":
//         (this.holy = []), (this.fire = []), (this.ice = []), (this.shadow = []);
//         break;
//       case "Consumables":
//         (this.healingPotions = []), (this.xpPotion = []);
//         break;
//       case "Resources":
//         (this.fish = []), (this.logs = []), (this.ore = []), (this.food = []);
//         break;
//     }
//   }

//   createStartingItems(itemType) {
//     switch (itemType) {
//       case "armor":
//         this.helm.push(new StartingItems("helm"));
//         // this.helms.push(new BronzeArmor("helm"));
//         this.chestPlate.push(new StartingItems("chestPlate"));
//         this.cape.push(new StartingItems("cape"));
//         this.gauntlets.push(new StartingItems("gauntlets"));
//         this.legs.push(new StartingItems("legs"));
//         this.shoes.push(new StartingItems("shoes"));
//         this.shield.push(new StartingItems("shield"));
//         break;
//       case "weapons":
//         this.sword.push(new StartingItems("sword"));
//         break;
//       case "spells":
//         this.fire.push(new Spells("fire"));
//         break;
//       case "consumables":
//         this.healingPotions.push(new Consumables("healingPotion"));
//         break;
//     }
//   }
// }

export class Skill {
  constructor(skillName) {
    this.skillName = skillName;
    this.lvl = 1;
    this.xp = 0;
    this.xpThreshHold = this.lvl * 50;
    // flytt threshhold ut fra constructor, trenger ikke å ha den i brukeren
    // evt bytte ut xpThreshHold med xpNeededForLvlUp og endre verdien hvergang du lvl opp
    // this.xpNeededLvlUp;
    this.restXp = 0; // when lvl up, remaining xp will be tranfered towards next lvl
  }
  lvlUp2() {
    console.log("condition met");
    this.restXp = this.xp % this.xpThreshHold[this.lvl];
    this.xp = this.restXp;
    this.restXp = 0;
    this.lvl++;
  }
}
