class UserGameDataLogger {
  static logInventory(user) {
    const inventory = user.inventory;
    const test = JSON.parse(JSON.stringify(inventory));
    const armorCategories = Object.keys(test);

    for (let i = 0; i < armorCategories.length; i++) {
      const category = armorCategories[i];
      const items = user.inventory[category];

      const itemKeys = Object.keys(items);

      if (itemKeys.length > 0) {
        for (let j = 0; j < itemKeys.length; j++) {
          const itemType = itemKeys[j];
          const itemInstances = items[itemType];

          if (itemInstances.length > 0) {
            for (let k = 0; k < itemInstances.length; k++) {
              const itemInstance = itemInstances[k];
              if (typeof itemInstance === "object" && itemInstance !== null) {
                console.log(`Item instance: `, itemInstance);
              }
            }
          }
        }
      }
    }
  }
}
export default UserGameDataLogger;
