import { describe, it, expect } from "vitest";
import { parseRowsAsStrings } from "../../utils/fileUtils";
import { countCrossedMAS, countXMAS } from "./day4";

describe("Advent of Code 2024 Day 4", () => {
  const exampleInput = `
  MMMSXXMASM
  MSAMXMSMSA
  AMXSXMAAMM
  MSAMASMSMX
  XMASAMXAMM
  XXAMMXXAMA
  SMSMSASXSS
  SAXAMASAAA
  MAMMMXMMMM
  MXMXAXMASX
  `;
  const exampleInputScore = 18;

  describe("Part 1", () => {
    it("should work on example", () => {
      const result = countXMAS(parseRowsAsStrings(exampleInput));
      expect(result).toBe(exampleInputScore);
    });
  });

  describe("Part 2", () => {
    const exampleInput = `
    .M.S......
    ..A..MSMS.
    .M.S.MAA..
    ..A.ASMSM.
    .M.S.M....
    ..........
    S.S.S.S.S.
    .A.A.A.A..
    M.M.M.M.M.
    ..........
    `;

    it("should work on example", () => {
      const result = countCrossedMAS(parseRowsAsStrings(exampleInput));
      expect(result).toBe(9);
    });
  });
});
