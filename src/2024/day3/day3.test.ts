import { describe, it, expect } from "vitest";
import {
  cleanText,
  disableCommands,
  performMul,
  parseMultiplications,
} from "./day3";

const exampleCommands =
  "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))";
const cleanedCommandsNoDisabling = [
  "mul(2,4)",
  "mul(5,5)",
  "mul(11,8)",
  "mul(8,5)",
];
const cleanedCommandsDisabling = [
  "mul(2,4)",
  "don't()",
  "mul(5,5)",
  "mul(11,8)",
  "do()",
  "mul(8,5)",
];
const parsedCommandsDisabling = ["mul(2,4)", "mul(8,5)"];

describe("Advent of Code 2024 Day 3", () => {
  describe("cleanText", () => {
    describe("on example input", () => {
      it("should clean text without disabling", () => {
        const input = exampleCommands;
        const results = cleanText(input, false);
        expect(results).toEqual(cleanedCommandsNoDisabling);
      });

      it("should clean text with disabling", () => {
        const input = exampleCommands;
        const results = cleanText(input, true);
        expect(results).toEqual(cleanedCommandsDisabling);
      });
    });

    describe("on edge cases", () => {
      it("should handle empty input for disableCommands", () => {
        const commands: string[] = [];
        const result = disableCommands(commands);
        expect(result).toEqual([]);
      });

      it("should handle empty input for cleanText", () => {
        const input = "";
        const result = cleanText(input, false);
        expect(result).toEqual([]);
      });
    });
  });

  describe("disableCommands", () => {
    it("should disable commands correctly", () => {
      const commands = ["mul(2,3)", "do()", "mul(4,5)", "don't()", "mul(6,7)"];
      const result = disableCommands(commands);
      expect(result).toEqual(["mul(2,3)", "mul(4,5)"]);
    });

    it("should work on example", () => {
      const commands = cleanedCommandsDisabling;
      const result = disableCommands(commands);
      expect(result).toEqual(parsedCommandsDisabling);
    });
  });

  describe("performMul", () => {
    it("should perform multiplication correctly", () => {
      const result = performMul("mul(2,3)");
      expect(result).toBe(6);
    });
    it("should parse multiplications correctly", () => {
      const multiplications = ["mul(2,3)", "mul(4,5)"];
      const result = parseMultiplications(multiplications);
      expect(result).toBe(26);
    });
    it("should handle invalid multiplication string", () => {
      const result = performMul("mul(a,b)");
      expect(result).toBeNaN();
    });
  });

  describe("parseMultiplications", () => {
    it("should parse multiplications correctly", () => {
      const multiplications = ["mul(2,3)", "mul(4,5)"];
      const result = parseMultiplications(multiplications);
      expect(result).toBe(26);
    });
  });
});
