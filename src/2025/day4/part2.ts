import * as fs from "fs";
import { performPartTwoTask } from "./warehouseLogic";

fs.promises.readFile("./src/2025/day4/input.txt", "utf-8").then((text) => {
  const warehouse = text.split("\n").map((line) => line.replace(/\r$/, ""));
  const totalRemovedRolls = performPartTwoTask(warehouse);

  console.log(`Total Removed Rolls: ${totalRemovedRolls}`);
});
