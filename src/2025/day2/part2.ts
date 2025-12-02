import * as fs from "fs";

fs.promises.readFile("./src/2025/day2/input.txt", "utf-8").then((text) => {
  let counter = 0;

  text.split(",").forEach((range) => {
    const rangeOfIds = range.split("-");
    const startId = Number(rangeOfIds[0]);
    const endId = Number(rangeOfIds[1]);
    for (let id = startId; id <= endId; id++) {
      if (!isIdValid(id.toString())) counter += id;
    }
  });

  console.log(`Sum od bad ids ${counter}`);
});

const isIdValid = (id: string) => {
  const length = id.length;

  for (let sequenceLength = 1; sequenceLength <= length / 2; sequenceLength++) {
    if (length % sequenceLength !== 0) continue; // only full sequences

    let isRepeating = true; // is repeating for that sequence length
    for (let char = 0; char < length - sequenceLength; char++) {
      if (id[char] !== id[char + sequenceLength]) {
        isRepeating = false;
        break;
      }
    }
    if (isRepeating) {
      // console.log(
      //   `Bad id: ${id}; repeating sequence length: ${sequenceLength}; sequence: ${id.slice(
      //     0,
      //     sequenceLength
      //   )}`
      // );
      return false;
    }
  }

  return true;
};
