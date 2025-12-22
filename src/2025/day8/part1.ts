import * as fs from "fs";
import { doPartOne } from "./circuitLogic";

fs.promises.readFile("./src/2025/day8/input.txt", "utf-8").then((text) => {
  const solution = doPartOne(
    text
      .split("\n")
      .map((line) => line.replace(/\r$/, "").split(",").map(Number))
  );

  console.log(`Solution ${solution}`);
});
