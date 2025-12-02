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
  if (length % 2 !== 0) {
    return true;
  }
  
  const halfLength = length / 2;
  const firstHalf = id.substring(0, halfLength);
  const secondHalf = id.substring(halfLength);
  
  if (firstHalf === secondHalf) {
    console.log(`Bad id: ${id}`);
    return false;
  }
  
  return true;
};
