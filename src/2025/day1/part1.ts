import * as fs from "fs";

fs.promises.readFile("./src/2025/day1/input.txt", "utf-8").then((text) => {
  let zeroCount = 0;
  let position = 50;

  text.split("\n").forEach((line) => {
    const direction = line[0];
    const sign = direction === "L" ? -1 : 1;
    const move = sign * Number(line.slice(1, undefined));
    position += move;
    position = (position + 100) % 100; // wrap around 0-99
    if (position === 0) zeroCount++;
  });

  console.log(`Zero count score: ${zeroCount}`);
});
