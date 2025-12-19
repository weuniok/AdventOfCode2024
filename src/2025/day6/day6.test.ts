import { describe, it, expect } from "vitest";
import {
  doPartOne,
  cleanMathsSpaces,
  transpose,
  doPartTwo,
  convertCharArrayToProblemDigits,
  convertMathsToCharArray,
  convertProblemDigitsToHorizontalProblems,
} from "./mathLogic";

describe("Advent of Code 2025 Day 6", () => {
  describe("Transpose Function", () => {
    it("should transpose a matrix correctly", () => {
      const matrix = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ];

      const transposed = transpose(matrix);
      expect(transposed).toEqual([
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
      ]);
    });
    it("should handle empty matrix", () => {
      const matrix: number[][] = [];
      const transposed = transpose(matrix);
      expect(transposed).toEqual([]);
    });

    it("should throw on matrix with unequal row lengths", () => {
      const matrix = [
        [1, 2],
        [3, 4, 5],
      ];
      expect(() => transpose(matrix)).toThrow(
        "Rows have unequal lengths; row 1 missing column 2"
      );
    });
  });
  describe("Parse Lines to Arrays Function", () => {
    it("should parse lines into arrays correctly", () => {
      const input = [
        "123 328  51 64",
        "45 64  387 23",
        "6 98  215 314",
        "*   +   *   +  ",
      ].join("\n");
      const expected = [
        ["123", "328", "51", "64"],
        ["45", "64", "387", "23"],
        ["6", "98", "215", "314"],
        ["*", "+", "*", "+"],
      ];
      expect(cleanMathsSpaces(input)).toEqual(expected);
    });
  });

  describe("Part 1", () => {
    it("should count movable rolls correctly for the given input", () => {
      const input = [
        "123 328  51 64 ",
        " 45 64  387 23 ",
        "  6 98  215 314",
        "*   +   *   +  ",
      ].join("\n");

      const result = doPartOne(input);
      console.log("Total:", result);
      expect(result).toBe(4277556);
    });
  });

  describe("convertMathsToCharArray", () => {
    it("should convert math lines to character arrays", () => {
      const input = ["123 328  51 64 ", " 45 64  387 23 ", "  6 98  215 314"];

      const result = convertMathsToCharArray(input);

      expect(result).toEqual([
        [
          "1",
          "2",
          "3",
          " ",
          "3",
          "2",
          "8",
          " ",
          " ",
          "5",
          "1",
          " ",
          "6",
          "4",
          " ",
        ],
        [
          " ",
          "4",
          "5",
          " ",
          "6",
          "4",
          " ",
          " ",
          "3",
          "8",
          "7",
          " ",
          "2",
          "3",
          " ",
        ],
        [
          " ",
          " ",
          "6",
          " ",
          "9",
          "8",
          " ",
          " ",
          "2",
          "1",
          "5",
          " ",
          "3",
          "1",
          "4",
        ],
      ]);
    });
  });

  describe("convertCharArrayToProblemDigits", () => {
    it("should convert character array to problem digits", () => {
      const charArray = [
        [
          "1",
          "2",
          "3",
          " ",
          "3",
          "2",
          "8",
          " ",
          " ",
          "5",
          "1",
          " ",
          "6",
          "4",
          " ",
        ],
        [
          " ",
          "4",
          "5",
          " ",
          "6",
          "4",
          " ",
          " ",
          "3",
          "8",
          "7",
          " ",
          "2",
          "3",
          " ",
        ],
        [
          " ",
          " ",
          "6",
          " ",
          "9",
          "8",
          " ",
          " ",
          "2",
          "1",
          "5",
          " ",
          "3",
          "1",
          "4",
        ],
      ];

      const result = convertCharArrayToProblemDigits(charArray);

      // Add expected values based on your logic
      expect(result).toEqual([
        1,
        24,
        356,
        NaN,
        369,
        248,
        8,
        NaN,
        32,
        581,
        175,
        NaN,
        623,
        431,
        4,
      ]);
    });
  });

  describe("convertProblemDigitsToHorizontalProblems", () => {
    it("should convert problem digits to horizontal problems", () => {
      const problemDigits = [123, NaN, 45, 67, NaN, 89];

      const result = convertProblemDigitsToHorizontalProblems(problemDigits);

      expect(result).toEqual([[123], [45, 67], [89]]);
    });

    it("should filter out empty groups from consecutive NaNs", () => {
      const problemDigits = [123, NaN, NaN, 45];

      const result = convertProblemDigitsToHorizontalProblems(problemDigits);

      expect(result).toEqual([[123], [45]]);
    });

    it("should handle starting with NaN", () => {
      const problemDigits = [NaN, 123, 45];

      const result = convertProblemDigitsToHorizontalProblems(problemDigits);

      expect(result).toEqual([[123, 45]]);
    });
  });

  describe("Part 2", () => {
    it("should count movable rolls correctly for the given input", () => {
      const input = [
        "123 328  51 64 ",
        " 45 64  387 23 ",
        "  6 98  215 314",
        "*   +   *   +  ",
      ].join("\n");

      const result = doPartTwo(input);
      console.log("Total:", result);
      expect(result).toBe(3263827);
    });
  });
});
