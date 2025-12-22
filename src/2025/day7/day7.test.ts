import { describe, it, expect } from "vitest";
import {
  doPartOne,
  isSplitter,
  findAllSplitters,
  findSplitterBelow,
  constructAdjacencyMatrix,
  countActiveSplittersBFS,
  Splitter,
  splitterToKey,
  doPartTwo,
} from "./beamLogic";

describe("Advent of Code 2025 Day 7", () => {
  describe("isSplitter", () => {
    it("should identify splitter character", () => {
      expect(isSplitter("^")).toBe(true);
      expect(isSplitter(".")).toBe(false);
      expect(isSplitter("S")).toBe(false);
      expect(isSplitter(" ")).toBe(false);
    });
  });

  describe("findAllSplitters", () => {
    it("should find all splitters in a map", () => {
      const map = ["..^..", "...^.", "^...^"];

      const splitters = findAllSplitters(map);
      expect(splitters).toEqual([
        [0, 2],
        [1, 3],
        [2, 0],
        [2, 4],
      ]);
    });

    it("should find all splitters in a map 2", () => {
      const map = [".^.", "...", "^.^"];
      const expected = [
        [0, 1] as Splitter,
        [2, 0] as Splitter,
        [2, 2] as Splitter,
      ];

      expect(findAllSplitters(map)).toEqual(expected);
    });

    it("should return empty array when no splitters found", () => {
      const map = [".....", "....."];

      const splitters = findAllSplitters(map);
      expect(splitters).toEqual([]);
    });

    it("should find all splitters in the example", () => {
      const map = [".......^.......", "......^.^......", ".....^.^.^....."];

      const splitters = findAllSplitters(map);
      expect(splitters.length).toBe(6);
    });
  });

  describe("findSplitterBelow", () => {
    it("should find the next splitter below in the same column", () => {
      const map = ["..^..", ".....", "..^..", "....."];

      const result = findSplitterBelow(0, 2, map);
      expect(result).toEqual([2, 2]);
    });

    it("should return null if no splitter found below", () => {
      const map = ["..^..", ".....", "....."];

      const result = findSplitterBelow(2, 0, map);
      expect(result).toBeNull();
    });

    it("should find the first splitter below, skipping empty rows", () => {
      const map = ["..^..", ".....", ".....", ".....", "..^.."];

      const result = findSplitterBelow(0, 2, map);
      expect(result).toEqual([4, 2]);
    });
  });

  describe("constructAdjacencyMatrix", () => {
    it("should build adjacency matrix for connected splitters", () => {
      const map = [".^.", "...", "^.^"];
      const splitters = [
        [0, 1] as Splitter,
        [2, 0] as Splitter,
        [2, 2] as Splitter,
      ];

      const adjacencyMatrix = constructAdjacencyMatrix(splitters, map);

      expect(adjacencyMatrix.size).toBe(3);
      // First splitter at [0,1] should connect to [2,0] and [2,2]
      const firstSplitterNeighbors = adjacencyMatrix.get(splitterToKey([0, 1]));
      expect(firstSplitterNeighbors).toHaveLength(2);
      expect(firstSplitterNeighbors).toContainEqual([2, 0]);
      expect(firstSplitterNeighbors).toContainEqual([2, 2]);
    });

    it("should handle splitters with no connections", () => {
      const map = ["^", "."];
      const splitters = findAllSplitters(map);

      const adjacencyMatrix = constructAdjacencyMatrix(splitters, map);

      const neighbors = adjacencyMatrix.get(splitterToKey([0, 0]));
      expect(neighbors).toEqual([]);
    });

    it("should build correct adjacency for complex pattern", () => {
      const map = ["..^..", ".....", ".^.^.", "....."];
      const splitters = findAllSplitters(map);

      const adjacencyMatrix = constructAdjacencyMatrix(splitters, map);

      // Splitter at [0,2] should connect to [2,1] and [2,3]
      const topSplitterNeighbors = adjacencyMatrix.get(splitterToKey([0, 2]));
      expect(topSplitterNeighbors).toHaveLength(2);
    });
  });

  describe("countActiveSplittersBFS", () => {
    it("should count all reachable splitters from start", () => {
      const adjacencyMatrix = new Map<string, Splitter[]>();
      adjacencyMatrix.set(splitterToKey([0, 0]), [
        [1, 1],
        [1, 2],
      ]);
      adjacencyMatrix.set(splitterToKey([1, 1]), [[3, 0]]);
      adjacencyMatrix.set(splitterToKey([1, 2]), [[3, 0]]);
      adjacencyMatrix.set(splitterToKey([3, 0]), []);

      const count = countActiveSplittersBFS([0, 0], adjacencyMatrix);
      expect(count).toBe(4);
    });

    it("should count single splitter with no connections", () => {
      const adjacencyMatrix = new Map<string, Splitter[]>();
      adjacencyMatrix.set(splitterToKey([0, 0]), []);

      const count = countActiveSplittersBFS([0, 0], adjacencyMatrix);
      expect(count).toBe(1);
    });

    it("should not count unreachable splitters", () => {
      const adjacencyMatrix = new Map<string, Splitter[]>();
      adjacencyMatrix.set(splitterToKey([0, 0]), [[1, 0]]);
      adjacencyMatrix.set(splitterToKey([1, 0]), []);
      adjacencyMatrix.set(splitterToKey([2, 0]), [[3, 0]]); // unreachable from [0,0]
      adjacencyMatrix.set(splitterToKey([3, 0]), []);

      const count = countActiveSplittersBFS([0, 0], adjacencyMatrix);
      expect(count).toBe(2);
    });
  });

  describe("Part 1", () => {
    it("should count active splitters for the example input", () => {
      const input = [
        ".......S.......",
        "...............",
        ".......^.......",
        "...............",
        "......^.^......",
        "...............",
        ".....^.^.^.....",
        "...............",
        "....^.^...^....",
        "...............",
        "...^.^...^.^...",
        "...............",
        "..^...^.....^..",
        "...............",
        ".^.^.^.^.^...^.",
        "...............",
      ];

      const result = doPartOne(input);
      expect(result).toBe(21);
    });

    it("should handle a simple case with one splitter", () => {
      const input = ["^", "."];

      const result = doPartOne(input);
      expect(result).toBe(1);
    });

    it("should handle multiple connected splitters", () => {
      const input = [".^.", "...", "^.^", "..."];

      const result = doPartOne(input);
      expect(result).toBe(3);
    });

    it("should handle disconnected splitters", () => {
      const input = ["^...^", ".....", "^...^"];

      const result = doPartOne(input);
      // Starting from first splitter [0,0], should only reach connected ones
      expect(result).toBeGreaterThan(0);
    });
  });

  describe("Part 2", () => {
    it("should count active splitters for the example input", () => {
      const input = [
        ".......S.......",
        "...............",
        ".......^.......",
        "...............",
        "......^.^......",
        "...............",
        ".....^.^.^.....",
        "...............",
        "....^.^...^....",
        "...............",
        "...^.^...^.^...",
        "...............",
        "..^...^.....^..",
        "...............",
        ".^.^.^.^.^...^.",
        "...............",
      ];

      const result = doPartTwo(input);
      expect(result).toBe(40);
    });
  });
});
