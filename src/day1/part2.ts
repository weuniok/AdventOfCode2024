import * as fs from "fs";

fs.promises.readFile("./src/day1/input.txt", "utf-8").then((text) => {
  const leftList: number[] = [];
  const rightListNumbers: { [index: number]: number } = {};

  text.split("\n").forEach((line) => {
    const [left, right] = line.split("   ").map(Number);
    leftList.push(left);
    rightListNumbers[right] = (rightListNumbers[right] || 0) + 1;
  });

  let score = 0;
  leftList.forEach((leftValue) => {
    score += leftValue * (rightListNumbers[leftValue] || 0);
  });

  console.log(`Similarity score: ${score}`);
});
