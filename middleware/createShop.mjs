"use strict";
import pg from "pg";
import { dbConnectionString } from "../modules/dbConfig.mjs";
import { shopArmorSet, shopWeaponSet } from "../modules/items.mjs";

export async function createShop(req, res, next) {
  const client = new pg.Client(dbConnectionString);

  try {
    await client.connect();
    let output = await client.query('SELECT  COUNT(*) FROM "public"."Shop"');

    if (parseInt(output.rows[0].count) < Object.keys(shopArmorSet).length) {
      const armorQualityType = Object.keys(shopArmorSet);
      const weaponQualityType = Object.keys(shopWeaponSet);
      for (let i = 0; i < armorQualityType.length; i++) {
        const armorSet = { [armorQualityType[i]]: shopArmorSet[armorQualityType[i]] };
        const weaponSet = { [weaponQualityType[i]]: shopWeaponSet[weaponQualityType[i]] };
        output = await client.query('INSERT INTO "public"."Shop"("armor", "weapon") VALUES($1::JSONB, $2::JSONB);', [armorSet, weaponSet]);
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
