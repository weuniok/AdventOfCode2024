import * as fs from "fs";
import { doPartTwo } from "./beamLogic";

fs.promises.readFile("./src/2025/day7/input.txt", "utf-8").then((text) => {
  const solution = doPartTwo(
    text.split("\n").map((line) => line.replace(/\r$/, ""))
  );

  console.log(`Solution ${solution}`);
});
