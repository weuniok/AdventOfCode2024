import { describe, it, expect } from "vitest";
import {
  doPartOne,
  calculateSquareDistance,
  validateBoxInput,
  createDistanceMap,
  getTopCircuitMutating,
  connectCircuitsMutating,
  countTopThreeCircuits,
  type Coordinates,
  type Box,
  doPartTwo,
} from "./circuitLogic";

describe("Advent of Code 2025 Day 8", () => {
  describe("calculateSquareDistance", () => {
    it("should calculate square distance correctly", () => {
      const coordA: Coordinates = [0, 0, 0];
      const coordB: Coordinates = [3, 4, 0];

      const result = calculateSquareDistance(coordA, coordB);
      expect(result).toBe(25); // 3^2 + 4^2 + 0^2 = 9 + 16 + 0 = 25
    });

    it("should calculate distance in 3D space", () => {
      const coordA: Coordinates = [1, 2, 3];
      const coordB: Coordinates = [4, 6, 8];

      const result = calculateSquareDistance(coordA, coordB);
      expect(result).toBe(50); // 3^2 + 4^2 + 5^2 = 9 + 16 + 25 = 50
    });

    it("should return zero for same coordinates", () => {
      const coordA: Coordinates = [5, 5, 5];
      const coordB: Coordinates = [5, 5, 5];

      const result = calculateSquareDistance(coordA, coordB);
      expect(result).toBe(0);
    });
  });

  describe("validateBoxInput", () => {
    it("should validate correct box input", () => {
      const coordinates = [
        [0, 0, 0],
        [1, 1, 1],
        [2, 2, 2],
      ];

      const boxes = validateBoxInput(coordinates);
      expect(boxes).toHaveLength(3);
      expect(boxes[0]).toEqual({
        coordinates: [0, 0, 0],
        circuitKey: 0,
        index: 0,
      });
      expect(boxes[2]).toEqual({
        coordinates: [2, 2, 2],
        circuitKey: 2,
        index: 2,
      });
    });

    it("should throw on invalid box input with wrong dimensions", () => {
      const coordinates = [
        [0, 0],
        [1, 1, 1],
      ];

      expect(() => validateBoxInput(coordinates)).toThrow(
        "All input entries must be boxes with three numeric values"
      );
    });

    it("should handle empty input", () => {
      const coordinates: number[][] = [];

      const boxes = validateBoxInput(coordinates);
      expect(boxes).toEqual([]);
    });
  });

  describe("createDistanceMap", () => {
    it("should create distance map for all box pairs", () => {
      const boxes: Box[] = [
        { coordinates: [0, 0, 0], circuitKey: 0, index: 0 },
        { coordinates: [1, 0, 0], circuitKey: 1, index: 1 },
        { coordinates: [2, 0, 0], circuitKey: 2, index: 2 },
      ];

      const connections = createDistanceMap(boxes);

      // Should have n*(n-1)/2 connections for n boxes (excluding self-connections)
      expect(connections.length).toBe(3);

      // Check distances are correct
      const conn0to1 = connections.find((c) => c.start === 0 && c.end === 1);
      expect(conn0to1?.distance).toBe(1);

      const conn0to2 = connections.find((c) => c.start === 0 && c.end === 2);
      expect(conn0to2?.distance).toBe(4);
    });
  });

  describe("getTopCircuitMutating", () => {
    it("should find root circuit key for isolated box", () => {
      const boxes: Box[] = [
        { coordinates: [0, 0, 0], circuitKey: 0, index: 0 },
      ];

      const root = getTopCircuitMutating(boxes[0]!, boxes);
      expect(root).toBe(0);
    });

    it("should find root circuit key for connected boxes", () => {
      const boxes: Box[] = [
        { coordinates: [0, 0, 0], circuitKey: 2, index: 0 },
        { coordinates: [1, 1, 1], circuitKey: 2, index: 1 },
        { coordinates: [2, 2, 2], circuitKey: 2, index: 2 },
      ];

      const root = getTopCircuitMutating(boxes[0]!, boxes);
      expect(root).toBe(2);
    });

    it("should perform path compression", () => {
      const boxes: Box[] = [
        { coordinates: [0, 0, 0], circuitKey: 1, index: 0 },
        { coordinates: [1, 1, 1], circuitKey: 2, index: 1 },
        { coordinates: [2, 2, 2], circuitKey: 2, index: 2 },
      ];

      const root = getTopCircuitMutating(boxes[0]!, boxes);
      expect(root).toBe(2);
      // After path compression, box 0 should point directly to root
      expect(boxes[0]!.circuitKey).toBe(2);
    });
  });

  describe("connectCircuitsMutating", () => {
    it("should connect two separate circuits", () => {
      const boxes: Box[] = [
        { coordinates: [0, 0, 0], circuitKey: 0, index: 0 },
        { coordinates: [1, 1, 1], circuitKey: 1, index: 1 },
      ];
      const connections = [{ start: 0, end: 1, distance: 3 }];

      connectCircuitsMutating(connections, boxes);

      const root0 = getTopCircuitMutating(boxes[0]!, boxes);
      const root1 = getTopCircuitMutating(boxes[1]!, boxes);
      expect(root0).toBe(root1);
    });

    it("should not affect already connected circuits", () => {
      const boxes: Box[] = [
        { coordinates: [0, 0, 0], circuitKey: 0, index: 0 },
        { coordinates: [1, 1, 1], circuitKey: 0, index: 1 },
      ];
      const connections = [{ start: 0, end: 1, distance: 3 }];

      connectCircuitsMutating(connections, boxes);

      expect(boxes[1]!.circuitKey).toBe(0);
    });

    it("should connect multiple boxes in sequence", () => {
      const boxes: Box[] = [
        { coordinates: [0, 0, 0], circuitKey: 0, index: 0 },
        { coordinates: [1, 1, 1], circuitKey: 1, index: 1 },
        { coordinates: [2, 2, 2], circuitKey: 2, index: 2 },
      ];
      const connections = [
        { start: 0, end: 1, distance: 3 },
        { start: 1, end: 2, distance: 3 },
      ];

      connectCircuitsMutating(connections, boxes);

      const root0 = getTopCircuitMutating(boxes[0]!, boxes);
      const root1 = getTopCircuitMutating(boxes[1]!, boxes);
      const root2 = getTopCircuitMutating(boxes[2]!, boxes);
      expect(root0).toBe(root1);
      expect(root1).toBe(root2);
    });
  });

  describe("countTopThreeCircuits", () => {
    it("should count sizes of circuits correctly", () => {
      const boxes: Box[] = [
        { coordinates: [0, 0, 0], circuitKey: 0, index: 0 },
        { coordinates: [1, 1, 1], circuitKey: 0, index: 1 },
        { coordinates: [2, 2, 2], circuitKey: 2, index: 2 },
        { coordinates: [3, 3, 3], circuitKey: 2, index: 3 },
        { coordinates: [4, 4, 4], circuitKey: 2, index: 4 },
        { coordinates: [5, 5, 5], circuitKey: 5, index: 5 },
      ];

      const result = countTopThreeCircuits(boxes);
      expect(result).toBe(6); // 3 * 2 * 1
    });

    it("should return product of top three circuit sizes", () => {
      const boxes: Box[] = [
        { coordinates: [0, 0, 0], circuitKey: 0, index: 0 },
        { coordinates: [1, 1, 1], circuitKey: 0, index: 1 },
        { coordinates: [2, 2, 2], circuitKey: 0, index: 2 },
        { coordinates: [3, 3, 3], circuitKey: 0, index: 3 },
        { coordinates: [4, 4, 4], circuitKey: 0, index: 4 },
        { coordinates: [5, 5, 5], circuitKey: 5, index: 5 },
        { coordinates: [6, 6, 6], circuitKey: 5, index: 6 },
        { coordinates: [7, 7, 7], circuitKey: 5, index: 7 },
        { coordinates: [8, 8, 8], circuitKey: 5, index: 8 },
        { coordinates: [9, 9, 9], circuitKey: 9, index: 9 },
        { coordinates: [10, 10, 10], circuitKey: 9, index: 10 },
      ];

      const result = countTopThreeCircuits(boxes);
      expect(result).toBe(40); // 5 * 4 * 2
    });

    it("should throw if less than three circuits", () => {
      const boxes: Box[] = [
        { coordinates: [0, 0, 0], circuitKey: 0, index: 0 },
        { coordinates: [1, 1, 1], circuitKey: 0, index: 1 },
      ];

      expect(() => countTopThreeCircuits(boxes)).toThrow(
        "Less than three circuits found"
      );
    });
  });

  describe("Part 1", () => {
    it("should handle a simple case with three separate boxes", () => {
      const coordinates = [
        [0, 0, 0],
        [10, 10, 10],
        [20, 20, 20],
      ];

      const result = doPartOne(coordinates, 0); // No connections
      expect(result).toBe(1); // 1 * 1 * 1
    });

    it("should handle three boxes forming two circuits", () => {
      const coordinates = [
        [0, 0, 0],
        [1, 0, 0],
        [100, 100, 100],
        [101, 100, 100],
      ];

      const result = doPartOne(coordinates, 1); // Connect closest pair
      expect(result).toBe(2); // 2 * 1 * 1
    });

    it("should handle the example from problem description", () => {
      const coordinates = [
        [162, 817, 812],
        [57, 618, 57],
        [906, 360, 560],
        [592, 479, 940],
        [352, 342, 300],
        [466, 668, 158],
        [542, 29, 236],
        [431, 825, 988],
        [739, 650, 466],
        [52, 470, 668],
        [216, 146, 977],
        [819, 987, 18],
        [117, 168, 530],
        [805, 96, 715],
        [346, 949, 466],
        [970, 615, 88],
        [941, 993, 340],
        [862, 61, 35],
        [984, 92, 344],
        [425, 690, 689],
      ];

      const result = doPartOne(coordinates, 10); // Connect 10 shortest pairs
      expect(result).toBe(40); // 5 * 4 * 2
    });

    it("should handle minimum case with exactly 3 circuits", () => {
      const coordinates = [
        [0, 0, 0],
        [1, 0, 0],
        [2, 0, 0],
      ];

      const result = doPartOne(coordinates, 0);
      expect(result).toBe(1); // 1 * 1 * 1
    });
  });

  describe("Part 2", () => {
    it("should handle a simple case connecting all boxes", () => {
      const coordinates = [
        [162, 817, 812],
        [57, 618, 57],
        [906, 360, 560],
        [592, 479, 940],
        [352, 342, 300],
        [466, 668, 158],
        [542, 29, 236],
        [431, 825, 988],
        [739, 650, 466],
        [52, 470, 668],
        [216, 146, 977],
        [819, 987, 18],
        [117, 168, 530],
        [805, 96, 715],
        [346, 949, 466],
        [970, 615, 88],
        [941, 993, 340],
        [862, 61, 35],
        [984, 92, 344],
        [425, 690, 689],
      ];
      const result = doPartTwo(coordinates);
      expect(result).toBe(25272);
    });
  });
});
