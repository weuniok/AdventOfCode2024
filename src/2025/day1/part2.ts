import * as fs from "fs";

// fs.promises.readFile("./src/2025/day1/input.txt", "utf-8").then((text) => {
//   let zeroCount = 0;
//   let position = 50;

//   text.split("\n").forEach((line) => {
//     const startPosition = position;
//     const direction = line[0];
//     const sign = direction === "L" ? -1 : 1;
//     const move = sign * Number(line.slice(1, undefined));
//     const newPosition = position + move;

//     const crossings = Math.floor(newPosition / 100);
//     zeroCount += Math.abs(crossings);
//     if (position == 0 && move < 0) zeroCount -= 1; // for case of e.g. 0 - 50 = -50, the 0 crossing was already counted.

//     if (newPosition === 0) zeroCount += 1; // for case of e.g. 50 - 50 = 0
//     position = ((newPosition % 100) + 100) % 100; // wrap around 0-99

//     console.log(
//       `Position ${startPosition} Move: ${move}, New Position: ${newPosition}, Wrapped Position: ${position}, Zero Count: ${zeroCount}`
//     );
//   });

//   console.log(`Zero count score: ${zeroCount}`);
// });

fs.promises.readFile("./src/2025/day1/input.txt", "utf-8").then((text) => {
  let zeroCount = 0;
  let position = 50;

  text.split("\n").forEach((line) => {
    const direction = line[0];
    const sign = direction === "L" ? -1 : 1;
    const move = Number(line.slice(1, undefined));

    for (let i = 0; i < Math.abs(move); i++) {
      position += sign;
      position = ((position % 100) + 100) % 100;
      if (position === 0) zeroCount++;
    }
  });

  console.log(`Zero count score: ${zeroCount}`);
});
