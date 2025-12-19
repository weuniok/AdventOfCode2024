const SPLITTER = "^";
export function isSplitter(char: string): boolean {
  return char === SPLITTER;
}

export type Splitter = [number, number];

export function splitterToKey(splitter: Splitter): string {
  return `${splitter[0]},${splitter[1]}`;
}

export function keyToSplitter(key: string): Splitter {
  const [row, col] = key.split(",").map(Number);
  return [row!, col!];
}

export function doPartOne(map: string[]) {
  const splitters = findAllSplitters(map);

  const firstSplitter = splitters[0];
  if (firstSplitter === undefined) {
    throw new Error("No splitters found in the map");
  }

  const adjacencyMatrix = constructAdjacencyMatrix(splitters, map);

  return countActiveSplittersBFS(firstSplitter, adjacencyMatrix);
}

export const findAllSplitters = (map: string[]): Splitter[] => {
  const splitters: Splitter[] = [];
  for (let row = 0; row < map.length; row++) {
    const thisRow = map[row];
    if (thisRow === undefined) {
      throw new Error(`Row ${row} is undefined, something went very wrong`);
    }
    for (let col = 0; col < thisRow.length; col++) {
      const thisChar = thisRow[col];
      if (thisChar === undefined) {
        throw new Error(
          `Column ${col} in row ${row} is undefined, something went very wrong`
        );
      }
      if (isSplitter(thisChar)) {
        splitters.push([row, col]);
      }
    }
  }
  return splitters;
};

export const findSplitterBelow = (
  startRow: number,
  col: number,
  map: string[]
): [number, number] | null => {
  for (let row = startRow + 1; row < map.length; row++) {
    const thisRow = map[row];
    if (thisRow === undefined) {
      throw new Error(`Row ${row} is undefined, something went very wrong`);
    }
    const thisChar = thisRow[col];
    if (thisChar === undefined) {
      throw new Error(
        `Column ${col} in row ${row} is undefined, something went very wrong`
      );
    }

    if (isSplitter(thisChar)) {
      return [row, col];
    }
  }
  return null;
};

export function constructAdjacencyMatrix(splitters: Splitter[], map: string[]) {
  const adjacencyMatrix = new Map<string, Splitter[]>();
  for (const splitter of splitters) {
    const [row, col] = splitter;
    const startOffsets: readonly [number, number][] = [
      [0, -1],
      [0, 1],
    ];
    const adjacentSplitters: Splitter[] = [];
    for (const [rowOffset, colOffset] of startOffsets) {
      const adjacentCol = col + colOffset;
      const adjacentRow = row + rowOffset;
      const adjacentChar = map[adjacentRow]?.[adjacentCol];
      if (adjacentChar === undefined) {
        continue;
      }
      const nextSplitter = findSplitterBelow(adjacentRow, adjacentCol, map);
      if (nextSplitter) {
        adjacentSplitters.push(nextSplitter);
      }
    }
    adjacencyMatrix.set(splitterToKey(splitter), adjacentSplitters);
  }
  return adjacencyMatrix;
}

export function countActiveSplittersBFS(
  firstSplitter: Splitter,
  adjacencyMatrix: Map<string, Splitter[]>
) {
  const checkedSplitters = new Set<string>();
  const checkQueue: Splitter[] = [firstSplitter];
  while (checkQueue.length > 0) {
    const current = checkQueue.pop();
    if (!current) continue;
    const currentKey = splitterToKey(current);
    if (checkedSplitters.has(currentKey)) continue;
    checkedSplitters.add(currentKey);

    const neighbors = adjacencyMatrix.get(currentKey) || [];
    for (const neighbor of neighbors) {
      if (!checkedSplitters.has(splitterToKey(neighbor))) {
        checkQueue.push(neighbor);
      }
    }
  }

  return checkedSplitters.size;
}
