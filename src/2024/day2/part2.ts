import { readText, parseRowsAsNumbers } from "../../utils/fileUtils";

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

      // Edge case: last element and dampener available - instant pass
      if (i + 1 >= row.length) continue;

      // There are 3 variants
      // variant A - we get rid of i
      // variant B - we get rid of i-i
      // only for i == 2:
      // variant C - we get rid of i = 0
      // this is for a case when i:[0, 1] have different monotonicity than i:[1, 2, 3, 4]

      // Variant A - we get rid of i
      if (i == 1) {
        // If i was 1, then we need to recalculate check function, which was defined by first 2 elements
        checkValuesValid = createCheckFunction(determineTrend(row[2], row[0]));
      }
      // Check if variant A is valid
      if (checkValuesValid(row[i + 1], row[i - 1])) {
        dampenerAvailable = false;
        i++;
        continue;
      }
      // Variant A is invalid
      // Variant B - we get rid of i-1
      if (i == 1) {
        // If i is 1 and we remove i=0, then we need to recalculate check function
        dampenerAvailable = false;
        checkValuesValid = createCheckFunction(determineTrend(row[2], row[1]));
        continue;
      }
      if (i == 2) {
        // If i is 2 and we remove i=1, we need to recalculate check function
        dampenerAvailable = false;
        checkValuesValid = createCheckFunction(determineTrend(row[2], row[0]));
        // Check if variant B is valid for the next step
        if (!checkValuesValid(row[i + 1], row[i])) {
          // Variant B is invalid, but for i == 2 we have a variant C
          // Variant C - i == 2 and we get rid of i-2 [i == 0]
          checkValuesValid = createCheckFunction(
            determineTrend(row[2], row[1])
          );
          if (checkValuesValid(row[2], row[1])) continue;
        }
      }

      // We removed i-1, so there is a need to make the new check for i-2 and i
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

readText("./src/2024/day2/input.txt").then((text) => {
  const rows = parseRowsAsNumbers(text);
  const safeRows = countSafeReportsPart2(rows);
  console.log(`Safe score: ${safeRows}`);
});
