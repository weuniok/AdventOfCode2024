export type Coordinates = [number, number, number];
export type Box = {
  coordinates: Coordinates;
  circuitKey: number;
  index: number;
};
export type Connection = {
  start: number;
  end: number;
  distance: number;
};

export function calculateSquareDistance(
  coordA: Coordinates,
  coordB: Coordinates
): number {
  const dx = coordA[0] - coordB[0];
  const dy = coordA[1] - coordB[1];
  const dz = coordA[2] - coordB[2];
  return dx * dx + dy * dy + dz * dz;
}

function isCoordinates(points: number[]): points is Coordinates {
  return points.length === 3;
}

export function doPartOne(coordinates: number[][], maxConnections = 1000) {
  const boxes: Box[] = validateBoxInput(coordinates);
  const connections = createDistanceMap(boxes)
    .sort((a, b) => a.distance - b.distance)
    .slice(0, maxConnections);

  connectCircuitsMutating(connections, boxes);

  const score = countTopThreeCircuits(boxes);
  return score;
}

export function validateBoxInput(coordinates: number[][]): Box[] {
  const boxes: Box[] = coordinates
    .filter(isCoordinates)
    .map((coords, index) => ({
      coordinates: coords,
      circuitKey: index,
      index: index,
    }));
  if (boxes.length !== coordinates.length) {
    throw new Error(
      "All input entries must be boxes with three numeric values"
    );
  }
  return boxes;
}

export function createDistanceMap(boxes: Box[]): Connection[] {
  const connections: {
    start: number;
    end: number;
    distance: number;
  }[] = [];

  for (const boxA of boxes) {
    for (const boxB of boxes.slice(boxA.index + 1, undefined)) {
      const distance = calculateSquareDistance(
        boxA.coordinates,
        boxB.coordinates
      );
      connections.push({ start: boxA.index, end: boxB.index, distance });
    }
  }

  return connections;
}

export const getTopCircuitMutating = (box: Box, boxes: Box[]): number => {
  let i = box.index;

  while (boxes[i]!.circuitKey !== i) {
    boxes[i]!.circuitKey = boxes[boxes[i]!.circuitKey]!.circuitKey; // shorten future searches
    i = boxes[i]!.circuitKey;
  }
  return i;
};

export function connectCircuitsMutating(
  connections: Connection[],
  boxes: Box[]
) {
  let changedAnything = false;
  for (const connection of connections) {
    const boxA = boxes[connection.start];
    const boxB = boxes[connection.end];

    if (boxA === undefined || boxB === undefined) {
      throw new Error("Connection refers to non-existent box");
    }

    const topCircuitA = getTopCircuitMutating(boxA, boxes);
    const topCircuitB = getTopCircuitMutating(boxB, boxes);
    if (topCircuitA !== topCircuitB) {
      boxes[topCircuitB]!.circuitKey = topCircuitA;
      changedAnything = true;
    }
  }

  return changedAnything;
}

export function countTopThreeCircuits(boxes: Box[]) {
  const circuitSizes = new Map<number, number>();
  for (const box of boxes) {
    const rootKey = getTopCircuitMutating(box, boxes);
    const currentSize = circuitSizes.get(rootKey) || 0;
    circuitSizes.set(rootKey, currentSize + 1);
  }

  const sorted = Array.from(circuitSizes.values()).sort((a, b) => b - a);
  if (sorted.length < 3) {
    throw new Error("Less than three circuits found");
  }
  const score = sorted[0]! * sorted[1]! * sorted[2]!;
  return score;
}

export function doPartTwo(coordinates: number[][]) {
  const boxes: Box[] = validateBoxInput(coordinates);
  const connections = createDistanceMap(boxes).sort(
    (a, b) => a.distance - b.distance
  );

  let lastConnection: Connection | null = null;

  for (const connection of connections) {
    const boxA = boxes[connection.start];
    const boxB = boxes[connection.end];

    if (boxA === undefined || boxB === undefined) {
      throw new Error("Connection refers to non-existent box");
    }

    const topCircuitA = getTopCircuitMutating(boxA, boxes);
    const topCircuitB = getTopCircuitMutating(boxB, boxes);

    // Only connect if they're in different circuits
    if (topCircuitA !== topCircuitB) {
      boxes[topCircuitB]!.circuitKey = topCircuitA;
      lastConnection = connection;

      // Check if all boxes are now in one circuit
      if (isAllInOneCircuit(boxes)) {
        break;
      }
    }
  }

  if (!lastConnection) {
    throw new Error("No connection needed or found");
  }

  const boxA = boxes[lastConnection.start]!;
  const boxB = boxes[lastConnection.end]!;

  return boxA.coordinates[0] * boxB.coordinates[0];
}

export function isAllInOneCircuit(boxes: Box[]): boolean {
  if (boxes.length === 0) return true;

  const firstRoot = getTopCircuitMutating(boxes[0]!, boxes);

  for (let i = 1; i < boxes.length; i++) {
    if (getTopCircuitMutating(boxes[i]!, boxes) !== firstRoot) {
      return false;
    }
  }

  return true;
}
