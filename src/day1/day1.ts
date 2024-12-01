import * as fs from "fs";

fs.promises.readFile("./src/day1/input.txt", "utf-8").then((text) => {
  const leftList: number[] = [];
  const rightList: number[] = [];

  text.split("\n").forEach((line) => {
    const [left, right] = line.split("   ").map(Number);
    leftList.push(left);
    rightList.push(right);
  });

  leftList.sort();
  rightList.sort();

  let distance = 0;
  leftList.forEach((leftValue, index) => {
    const rightValue = rightList[index];
    distance += Math.abs(leftValue - rightValue);
  });

  console.log(distance);
});
