import * as fs from "fs";
import { parseInput, readText } from "./utils";

export const countSafeReportsPart1 = (rows: number[][]) => {
  const createCheckFunction = (
    trend: "increasing" | "decreasing",
    minDiff = 1,
    maxDiff = 3
  ) => {
    return (nextValue: number, prevValue: number) => {
      if (trend === "increasing") {
        return (
          nextValue - prevValue <= maxDiff && nextValue - prevValue >= minDiff
        );
      } else {
        return (
          nextValue - prevValue >= -maxDiff && nextValue - prevValue <= -minDiff
        );
      }
    };
  };

  const safeRows = rows.reduce((acc, row) => {
    const firstDiff = row[1] - row[0];
    let checkValuesValid = undefined;

    if (firstDiff == 0) return acc;
    if (firstDiff > 0) checkValuesValid = createCheckFunction("increasing");
    else checkValuesValid = createCheckFunction("decreasing");

    let safe: boolean = true;
    for (let i = 1; i < row.length; i++) {
      if (!checkValuesValid(row[i], row[i - 1])) {
        safe = false;
        break;
      }
    }
    return safe ? acc + 1 : acc;
  }, 0);

  return safeRows;
};

readText().then((text) => {
  const rows = parseInput(text);
  const safeRows = countSafeReportsPart1(rows);
  console.log(`Safe score: ${safeRows}`);
});
