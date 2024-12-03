import { readText } from "../utils/readFile";
import { parseInput } from "./utils";

export const countSafeReportsPart2 = (rows: number[][]): number => {
  const createCheckFunction = (
    trend: "increasing" | "decreasing" | "stagnant",
    minDiff = 1,
    maxDiff = 3
  ) => {
    switch (trend) {
      case "increasing":
        return (nextValue: number, prevValue: number) => {
          return (
            nextValue - prevValue <= maxDiff && nextValue - prevValue >= minDiff
          );
        };
      case "decreasing":
        return (nextValue: number, prevValue: number) => {
          return (
            nextValue - prevValue >= -maxDiff &&
            nextValue - prevValue <= -minDiff
          );
        };
      default:
        return (nextValue: number, prevValue: number) => false;
    }
  };

  const determineTrend = (nextValue: number, prevValue: number) => {
    if (nextValue > prevValue) return "increasing";
    if (nextValue < prevValue) return "decreasing";
    return "stagnant";
  };

  const isRowValid = (row: number[]): boolean => {
    let dampenerAvailable = true;
    let safe: boolean = true;

    // Check values
    const trend = determineTrend(row[1], row[0]);
    let checkValuesValid: (a: number, b: number) => boolean =
      createCheckFunction(trend);

    for (let i = 1; i < row.length; i++) {
      if (checkValuesValid(row[i], row[i - 1])) continue;
      if (!dampenerAvailable) {
        // Dampener already used
        safe = false;
        break;
      }
      if (i + 1 >= row.length) continue; // Edge case - last element

      // Variant A - we get rid of i
      if (i == 1) {
        checkValuesValid = createCheckFunction(determineTrend(row[2], row[0]));
      }
      if (checkValuesValid(row[i + 1], row[i - 1])) {
        dampenerAvailable = false;
        i++;
        continue;
      }
      // Variant B - we get rid of i-1
      if (i == 1) {
        dampenerAvailable = false;
        checkValuesValid = createCheckFunction(determineTrend(row[2], row[1]));
        continue;
      }
      if (i == 2) {
        dampenerAvailable = false;
        checkValuesValid = createCheckFunction(determineTrend(row[2], row[0]));
        // Variant C - i == 2 and we get rid of i-2 [i == 0]
        if (!checkValuesValid(row[i + 1], row[i])) {
          checkValuesValid = createCheckFunction(
            determineTrend(row[2], row[1])
          );
          if (checkValuesValid(row[2], row[1])) continue;
        }
      }
      if (checkValuesValid(row[i], row[i - 2])) {
        dampenerAvailable = false;
        continue;
      }

      // Neither variant is valid
      safe = false;
      break;
    }
    return safe;
  };

  const safeRows = rows.reduce((acc, row) => {
    const isValid = isRowValid(row);
    return isValid ? acc + 1 : acc;
  }, 0);

  return safeRows;
};

readText("./src/day2/input.txt").then((text) => {
  const rows = parseInput(text);
  const safeRows = countSafeReportsPart2(rows);
  console.log(`Safe score: ${safeRows}`);
});
