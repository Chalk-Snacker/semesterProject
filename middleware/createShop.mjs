"use strict";
import pg from "pg";
import { dbConnectionString } from "../modules/dbConfig.mjs";
import { shopArmorSet, shopWeaponSet, shopConsumableSet } from "../modules/inventory.mjs";

export async function createShop(req, res, next) {
  const client = new pg.Client(dbConnectionString);

  try {
    await client.connect();
    let output = await client.query('SELECT  COUNT(*) FROM "public"."Shop"');

    if (parseInt(output.rows[0].count) < Object.keys(shopArmorSet).length) {
      const armorQualityType = Object.keys(shopArmorSet);
      const weaponQualityType = Object.keys(shopWeaponSet);
      const consumableTypes = Object.keys(shopConsumableSet);
      for (let i = 0; i < armorQualityType.length; i++) {
        const armorSet = { [armorQualityType[i]]: shopArmorSet[armorQualityType[i]] };
        const weaponSet = { [weaponQualityType[i]]: shopWeaponSet[weaponQualityType[i]] };
        const consumableSet = { [consumableTypes[i]]: shopConsumableSet[consumableTypes[i]] };
        output = await client.query('INSERT INTO "public"."Shop"("armor", "weapon", "consumables") VALUES($1::JSONB, $2::JSONB, $3::JSONB);', [
          armorSet,
          weaponSet,
          consumableSet,
        ]);
      }
    } else {
      // console.log("Items are already in shop");
    }
    next();
  } catch (error) {
    // console.error("Error adding items to shop table", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  } finally {
    client.end();
  }
}
