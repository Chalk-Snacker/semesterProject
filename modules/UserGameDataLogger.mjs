import chalk from "chalk";

class UserGameDataLogger {
  static logInventory(user) {
    const inventory = user.inventory;
    const inventoryData = JSON.parse(JSON.stringify(inventory));
    const armorCategories = Object.keys(inventoryData);

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
                // console.log(`Item instance: `, itemInstance);
                const itemTypeColor = chalk.grey.bold;
                const propertyNameColors = {
                  itemType: chalk.magenta,
                  name: chalk.black.bold.bgYellow,
                  defense: chalk.green,
                  lvlReq: chalk.red,
                  magic: chalk.blue,
                  healing: chalk.cyan,
                  attack: chalk.blueBright,
                };

                const formattedItem = Object.entries(itemInstance).map(([key, value]) => {
                  const colorFunction = propertyNameColors[key] || chalk.white;

                  if (typeof value === "object" && value !== null) {
                    // nesta objects er så gøy!! :))))))))))
                    const nestedProperties = Object.entries(value)
                      .map(([nestedKey, nestedValue]) => {
                        const nestedColorFunction = propertyNameColors[nestedKey] || chalk.white;
                        return `  ${nestedColorFunction(nestedKey)}: ${nestedColorFunction(nestedValue)}`;
                      })
                      .join("\n");
                    return `${colorFunction(key)}: {\n${nestedProperties}\n }`;
                  } else {
                    return `${colorFunction(key)}: ${colorFunction(value)}`;
                  }
                });
                console.log(`${itemTypeColor("Item instance:")} ${itemTypeColor(itemType)} {\n${formattedItem.join("\n")}\n}`);
              }
            }
          }
        }
      }
    }
  }
}
export default UserGameDataLogger;
