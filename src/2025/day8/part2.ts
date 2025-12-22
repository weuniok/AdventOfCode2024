import * as fs from "fs";
import { doPartTwo } from "./circuitLogic";

fs.promises.readFile("./src/2025/day8/input.txt", "utf-8").then((text) => {
  const solution = doPartTwo(
    text
      .split("\n")
      .map((line) => line.replace(/\r$/, "").split(",").map(Number))
  );

  console.log(`Solution ${solution}`);
});