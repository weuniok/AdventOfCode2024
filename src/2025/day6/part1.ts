import * as fs from "fs";
import { doPartOne } from "./mathLogic";

fs.promises.readFile("./src/2025/day6/input.txt", "utf-8").then((text) => {
  const sumOfSolutions = doPartOne(text);

  console.log(`Solution ${sumOfSolutions}`);
});

