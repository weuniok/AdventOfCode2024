import { parseRowsAsStrings, readText } from "../utils/fileUtils";

export const indexOfGlobal = (str: string, search: string) => {
  const indices = [];

  let idx = str.indexOf(search);
  while (idx !== -1) {
    indices.push(idx);
    idx = str.indexOf(search, idx + 1);
  }
  return indices;
};

export const checkAdjacent = (
  rows: string[],
  search: string,
  startLocation: number[],
  dimensions: number[]
) => {
  const [rowIndex, columnIndex] = startLocation;

  let adjacentCoords: number[][] = [];
  for (let rowI = rowIndex - 1; rowI <= rowIndex + 1; rowI++) {
    for (let columnI = columnIndex - 1; columnI <= columnIndex + 1; columnI++) {
      if (checkOutOfBounds([rowI, columnI], dimensions)) continue;
      if (rowI === rowIndex && columnI === columnIndex) continue;

      if (rows[rowI][columnI] === search) adjacentCoords.push([rowI, columnI]);
    }
  }

  return adjacentCoords;
};

export const checkDiagonals = (
  rows: string[],
  search: string,
  startLocation: number[],
  dimensions: number[]
) => {
  const [rowIndex, columnIndex] = startLocation;

  let adjacentCoords: number[][] = [];
  const diagonalCoords = [
    [rowIndex - 1, columnIndex - 1],
    [rowIndex - 1, columnIndex + 1],
    [rowIndex + 1, columnIndex - 1],
    [rowIndex + 1, columnIndex + 1],
  ];

  diagonalCoords.forEach(([rowI, columnI]) => {
    if (checkOutOfBounds([rowI, columnI], dimensions)) return;
    if (rows[rowI][columnI] === search) adjacentCoords.push([rowI, columnI]);
  });

  return adjacentCoords;
};

export const checkOutOfBounds = (coords: number[], dimensions: number[]) => {
  const [row, column] = coords;
  const [rowLength, columnLength] = dimensions;

  if (row < 0 || row >= rowLength || column < 0 || column >= columnLength)
    return true;
  return false;
};

export const countXMAS = (rows: string[]) => {
  let score = 0;
  const dimensions = [rows.length, rows[0].length];

  rows.forEach((row, rowIndex) => {
    const xIndices = indexOfGlobal(row, "X");
    xIndices.forEach((xIndex) => {
      const mLocations = checkAdjacent(
        rows,
        "M",
        [rowIndex, xIndex],
        dimensions
      );
      mLocations.forEach(([mRow, mColumn]) => {
        const searchVector = [mRow - rowIndex, mColumn - xIndex];
        const aCoords = [mRow + searchVector[0], mColumn + searchVector[1]];
        const sCoords = [
          mRow + 2 * searchVector[0],
          mColumn + 2 * searchVector[1],
        ];
        if (
          checkOutOfBounds(sCoords, dimensions) ||
          checkOutOfBounds(aCoords, dimensions)
        )
          return;
        if (
          rows[aCoords[0]][aCoords[1]] === "A" &&
          rows[sCoords[0]][sCoords[1]] === "S"
        )
          score++;
      });
    });
  });

  return score;
};

export const countCrossedMAS = (rows: string[]) => {
  // This searches for all MASes and then checks if they cross
  // The better solution is probably to find all As and check if their diagonals are M and S

  let score = 0;
  const dimensions = [rows.length, rows[0].length];

  const aCoords: { [coords: string]: number } = {};
  rows.forEach((row, rowIndex) => {
    const mIndices = indexOfGlobal(row, "M");
    mIndices.forEach((xIndex) => {
      const aLocations = checkDiagonals(
        rows,
        "A",
        [rowIndex, xIndex],
        dimensions
      );
      aLocations.forEach(([aRow, aColumn]) => {
        const searchVector = [aRow - rowIndex, aColumn - xIndex];
        const sCoords = [aRow + searchVector[0], aColumn + searchVector[1]];
        if (checkOutOfBounds(sCoords, dimensions)) return;
        if (rows[sCoords[0]][sCoords[1]] === "S") {
          aCoords[`${aRow},${aColumn}`] = aCoords[`${aRow},${aColumn}`]
            ? aCoords[`${aRow},${aColumn}`] + 1
            : 1;
        }
      });
    });
  });

  // For two MAS to cross they must use the same A
  Object.keys(aCoords).forEach((coord) => {
    if (aCoords[coord] > 1) score += 1;
  });

  return score;
};

export function performPart1() {
  readText("./src/day4/input.txt").then((text) => {
    const parsedRows = parseRowsAsStrings(text);
    const value = countXMAS(parsedRows);

    console.log(`Part 1 score: ${value}`);
  });
}

export function performPart2() {
  readText("./src/day4/input.txt").then((text) => {
    const parsedRows = parseRowsAsStrings(text);
    const value = countCrossedMAS(parsedRows);

    console.log(`Part 2 score: ${value}`);
  });
}

performPart1();
performPart2();
