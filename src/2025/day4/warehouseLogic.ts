export const isRoll = (char: string): boolean => {
  return char === "@";
};

export const performPartOneTask = (warehouse: string[]): number => {
  const rows = warehouse.length;
  const cols = warehouse?.[0]?.length ?? 0;

  const adjacencyMatrix = constructAdjacencyMatrix(rows, cols, warehouse);

  const movableRolls = countMovableRolls(
    rows,
    cols,
    warehouse,
    adjacencyMatrix
  );
  return movableRolls;
};

function countMovableRolls(
  rows: number,
  cols: number,
  warehouse: string[],
  adjacencyMatrix: any[][]
) {
  let movableRolls = 0;
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const currentPlace = warehouse[row]?.[col] ?? undefined;
      const currentAdjacentCount = adjacencyMatrix[row]?.[col] ?? undefined;
      if (currentPlace === undefined || currentAdjacentCount === undefined) {
        throw new Error(
          `Out of bounds error: row=${row}, col=${col}, adjacencyMatrixRow=${adjacencyMatrix[row]}, warehouseRow=${warehouse[row]}`
        );
      }

      if (isRoll(currentPlace) && currentAdjacentCount < 4) {
        movableRolls += 1;
      }
    }
  }
  return movableRolls;
}

function constructAdjacencyMatrix(
  rows: number,
  cols: number,
  warehouse: string[]
): number[][] {
  const adjacencyMatrix: number[][] = new Array(rows)
    .fill(0)
    .map(() => new Array(cols).fill(0));

  for (let row = 0; row < rows; row++) {
    const thisRow = warehouse[row];
    if (!thisRow) continue;

    for (let col = 0; col < cols; col++) {
      const currentPlace = thisRow[col] ?? "NaN";

      if (isRoll(currentPlace)) {
        const directions = [
          [0, -1],
          [0, 1],
          [-1, 0],
          [1, 0],
          [-1, -1],
          [-1, 1],
          [1, -1],
          [1, 1],
        ] as const;

        for (const [dRow, dCol] of directions) {
          const newRow = row + dRow;
          const newCol = col + dCol;

          if (
            newRow >= 0 &&
            newRow < rows &&
            newCol >= 0 &&
            newCol < cols &&
            adjacencyMatrix[newRow]?.[newCol] !== undefined
          ) {
            adjacencyMatrix[newRow][newCol] += 1;
          }
        }
      }
    }
  }
  return adjacencyMatrix;
}

export const performPartTwoTask = (warehouse: string[]): number => {
  const rows = warehouse.length;
  const cols = warehouse?.[0]?.length ?? 0;

  const adjacencyMatrix = constructAdjacencyMatrix(rows, cols, warehouse);

  const removedRolls = removeAllMovableRolls(
    rows,
    cols,
    warehouse,
    adjacencyMatrix
  );

  return removedRolls;
};

function removeAllMovableRolls(
  rows: number,
  cols: number,
  warehouse: string[],
  adjacencyMatrix: number[][]
) {
  let removedRolls = 0;
  let didRemoveRoll = true;
  while (didRemoveRoll) {
    didRemoveRoll = false;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const currentRow = warehouse[row];
        const currentPlace = warehouse[row]?.[col] ?? undefined;
        const currentAdjacentCount = adjacencyMatrix[row]?.[col] ?? undefined;
        if (
          currentRow === undefined ||
          currentPlace === undefined ||
          currentAdjacentCount === undefined
        ) {
          throw new Error(
            `Out of bounds error: row=${row}, col=${col}, adjacencyMatrixRow=${adjacencyMatrix[row]}, warehouseRow=${warehouse[row]}`
          );
        }

        if (isRoll(currentPlace) && currentAdjacentCount < 4) {
          removedRolls += 1;
          didRemoveRoll = true;
          warehouse[row] =
            currentRow.substring(0, col) + "." + currentRow.substring(col + 1);

          const directions = [
            [0, -1],
            [0, 1],
            [-1, 0],
            [1, 0],
            [-1, -1],
            [-1, 1],
            [1, -1],
            [1, 1],
          ] as const;

          for (const [dRow, dCol] of directions) {
            const newRow = row + dRow;
            const newCol = col + dCol;

            if (
              newRow >= 0 &&
              newRow < rows &&
              newCol >= 0 &&
              newCol < cols &&
              adjacencyMatrix[newRow]?.[newCol] !== undefined
            ) {
              adjacencyMatrix[newRow][newCol] -= 1;
            }
          }
        }
      }
    }
  }
  return removedRolls;
}
