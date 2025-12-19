export function doPartOne(text: string) {
  const maths = cleanMathsSpaces(text);
  const operators = maths[maths.length - 1];
  if (!operators) {
    throw new Error("No operators found in the input");
  }

  const verticalProblems = maths.slice(0, -1).map((line) => line.map(Number));
  const horizontalProblems = transpose(verticalProblems);

  const sumOfSolutions = calculateSumOfProblems(horizontalProblems, operators);
  return sumOfSolutions;
}

function calculateSumOfProblems(
  horizontalProblems: number[][],
  operators: string[]
) {
  return horizontalProblems.reduce((acc, problem, index) => {
    const operator = operators[index];
    let result: number;
    if (operator === "+") {
      result = problem.reduce((a, b) => a + b, 0);
    } else if (operator === "*") {
      result = problem.reduce((a, b) => a * b, 1);
    } else {
      throw new Error(`Unknown operator: ${operator}`);
    }
    return acc + result;
  }, 0);
}

export function cleanMathsSpaces(text: string) {
  const maths = text.split("\n").map(cleanLine);
  return maths;
}

function cleanLine(text: string) {
  const regex = /\s+/;
  return text.replace(/\r$/, "").trim().split(regex);
}

export function transpose<T>(matrix: T[][]): T[][] {
  if (matrix.length === 0) return [];

  const firstRow = matrix[0];
  if (!firstRow) return [];

  return firstRow.map((_col, i) =>
    matrix.map((row) => {
      const value = row[i];
      if (value === undefined) {
        throw new Error(
          `Rows have unequal lengths; row ${matrix.indexOf(
            row
          )} missing column ${i}`
        );
      }
      return value;
    })
  );
}

// Part 2

export function doPartTwo(text: string) {
  const maths = text.split("\n");

  const operatorsLine = maths[maths.length - 1];
  if (!operatorsLine) {
    throw new Error("No operators found in the input");
  }
  const operators = cleanLine(operatorsLine);
  const charArrayProblems = convertMathsToCharArray(maths.slice(0, -1));
  // at this point it is a char array with spaces, where problems are still vertical and right to left
  const problems = convertCharArrayToProblemDigits(charArrayProblems);
  const horizontalProblems = convertProblemDigitsToHorizontalProblems(problems);
  const sumOfSolutions = calculateSumOfProblems(horizontalProblems, operators);
  return sumOfSolutions;
}

export function convertProblemDigitsToHorizontalProblems(problems: number[]) {
  return problems
    .reduce(
      (acc, number) => {
        if (Number.isNaN(number)) {
          acc.push([]);
        } else {
          acc[acc.length - 1]!.push(number); // we start with one empty group, thus null assertion
        }
        return acc;
      },
      [[]] as number[][]
    )
    .filter((group) => group.length > 0); // remove empty groups caused by several NaNs in a row
}

export function convertCharArrayToProblemDigits(charArrayProblems: string[][]) {
  return transpose(charArrayProblems).map((line) => {
    // after transpose we have problems divided by empty row,
    // the rows within problems are their digits from most significant to least significant
    // e.g.
    // [1,  , ,]
    // [3, 2, 1]
    // [       ]
    // *another problem*
    // representing 1x321
    const trimmedLine = line.join("").trim();
    return trimmedLine === "" ? NaN : Number(trimmedLine);
  });
}

export function convertMathsToCharArray(maths: string[]) {
  return maths.map((line) => Array.from(line.replace(/\r$/, "")));
}
