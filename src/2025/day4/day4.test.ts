import { describe, it, expect } from "vitest";
import {
  performPartOneTask,
  isRoll,
  performPartTwoTask,
} from "./warehouseLogic";

describe("Advent of Code 2025 Day 4", () => {
  describe("isRoll", () => {
    it("should identify rolls correctly", () => {
      expect(isRoll("@")).toBe(true);
    });
    it("should identify non-rolls correctly", () => {
      expect(isRoll(".")).toBe(false);
      expect(isRoll("A")).toBe(false);
      expect(isRoll(" ")).toBe(false);
    });
  });
  describe("Part 1", () => {
    it("should count movable rolls correctly for the given input", () => {
      const input = [
        "..@@.@@@@.",
        "@@@.@.@.@@",
        "@@@@@.@.@@",
        "@.@@@@..@.",
        "@@.@@@@.@@",
        ".@@@@@@@.@",
        ".@.@.@.@@@",
        "@.@@@.@@@@",
        ".@@@@@@@@.",
        "@.@.@@@.@.",
      ];

      const result = performPartOneTask(input);
      console.log("Total movable rolls:", result);
      expect(result).toBe(13);
    });
  });
  describe("Part 2", () => {
    it("should count removed rolls correctly for the given input", () => {
      const input = [
        "..@@.@@@@.",
        "@@@.@.@.@@",
        "@@@@@.@.@@",
        "@.@@@@..@.",
        "@@.@@@@.@@",
        ".@@@@@@@.@",
        ".@.@.@.@@@",
        "@.@@@.@@@@",
        ".@@@@@@@@.",
        "@.@.@@@.@.",
      ];

      const result = performPartTwoTask(input);
      console.log("Total movable rolls:", result);
      expect(result).toBe(43);
    });
  });
});
