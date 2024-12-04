import { describe, it, expect } from "vitest";
import { countSafeReportsPart1 } from "./part1";
import { countSafeReportsPart2 } from "./part2";
import { parseRowsAsNumbers } from "../utils/fileUtils";

describe("Advent of Code 2024 Day 2", () => {
  const SIMPLE = `
    7 6 4 2 1
    1 2 7 8 9
    9 7 6 2 1
    1 3 2 4 5
    8 6 4 4 1
    1 3 6 7 9
  `;

  it("ex_1 example", () => {
    expect(countSafeReportsPart1(parseRowsAsNumbers(SIMPLE))).toBe(2);
  });

  it("ex_1 single line increasing", () => {
    expect(countSafeReportsPart1(parseRowsAsNumbers("1 3 6 7 9"))).toBe(1);
  });

  it("ex_1 single line decreasing", () => {
    expect(countSafeReportsPart1(parseRowsAsNumbers("7 6 4 2 1"))).toBe(1);
  });

  it("ex_1 input prefix", () => {
    expect(
      countSafeReportsPart1(
        parseRowsAsNumbers(`
      2 5 6 8 6               # 0
      87 89 90 93 96 99 99    # 0
      13 14 15 18 19 23       # 0
      67 69 71 72 73 76 82    # 0
      29 32 30 31 34 35 37    # 0
      54 56 54 57 54          # 0
      70 73 75 74 77 79 81 81 # 0
      53 55 56 59 62 61 65    # 0
      90 93 95 92 99          # 0
      58 61 61 64 67          # 0
      36 37 37 39 42 39       # 0
      32 35 38 40 40 40       # 0
      17 19 21 22 23 25 28    # 1
      9 11 12 14 16           # 2
    `)
      )
    ).toBe(2);
  });

  it("ex_1 empty input", () => {
    expect(countSafeReportsPart1(parseRowsAsNumbers(""))).toBe(0);
  });

  it("ex_1 max delta allowed", () => {
    expect(countSafeReportsPart1(parseRowsAsNumbers("1 4 7\n10 7 4"))).toBe(2);
  });

  it("ex_1 exact delta boundaries", () => {
    expect(countSafeReportsPart1(parseRowsAsNumbers("1 2 3 4\n4 3 2 1"))).toBe(
      2
    );
  });

  it("ex_1 invalid deltas exceeding three", () => {
    expect(countSafeReportsPart1(parseRowsAsNumbers("1 5\n5 1"))).toBe(0);
  });

  it("ex_1 mixed increasing decreasing within deltas", () => {
    expect(countSafeReportsPart1(parseRowsAsNumbers("1 2 1 2\n3 4 3 4"))).toBe(
      0
    );
  });

  it("ex_1 all same numbers", () => {
    expect(countSafeReportsPart1(parseRowsAsNumbers("5 5 5 5"))).toBe(0);
  });

  it("ex_1 two level reports", () => {
    expect(
      countSafeReportsPart1(parseRowsAsNumbers("1 2\n2 1\n3 6\n6 3"))
    ).toBe(4);
  });

  it("ex_2 example", () => {
    expect(countSafeReportsPart2(parseRowsAsNumbers(SIMPLE))).toBe(4);
  });

  it("ex_2 example unsafe", () => {
    expect(countSafeReportsPart2(parseRowsAsNumbers("9 7 6 2 1"))).toBe(0);
  });

  it("ex_2 problem at the start", () => {
    expect(countSafeReportsPart2(parseRowsAsNumbers("3 1 2 4 5"))).toBe(1);
  });

  it("ex_2 problem at the end", () => {
    expect(countSafeReportsPart2(parseRowsAsNumbers("1 2 4 5 3"))).toBe(1);
  });

  it("ex_2 problem at the end short", () => {
    expect(countSafeReportsPart2(parseRowsAsNumbers("4 5 3"))).toBe(1);
  });

  it("ex_2 problem 4 3 5 3", () => {
    expect(countSafeReportsPart2(parseRowsAsNumbers("4 3 5 3"))).toBe(0);
  });

  it("ex_2 problem 4 3 5 2", () => {
    expect(countSafeReportsPart2(parseRowsAsNumbers("4 3 5 2"))).toBe(1);
  });

  it("ex_2 problem 4 3 5 6", () => {
    expect(countSafeReportsPart2(parseRowsAsNumbers("4 3 5 6"))).toBe(1);
  });

  it("ex_2 analyzer case 5", () => {
    expect(
      countSafeReportsPart2(parseRowsAsNumbers("29 32 30 31 34 35 37"))
    ).toBe(1);
  });

  it("ex_2 analyzer case 80", () => {
    expect(countSafeReportsPart2(parseRowsAsNumbers("31 35 34 36 38 39"))).toBe(
      1
    );
  });

  it("ex_2 analyzer case 204", () => {
    expect(countSafeReportsPart2(parseRowsAsNumbers("52 48 50 48 46"))).toBe(1);
  });

  it("ex_2 analyzer case 229", () => {
    expect(countSafeReportsPart2(parseRowsAsNumbers("89 83 86 84 81"))).toBe(1);
  });

  it("ex_2 analyzer case 323", () => {
    expect(countSafeReportsPart2(parseRowsAsNumbers("90 86 88 86 83"))).toBe(1);
  });

  it("ex_2 analyzer case 378", () => {
    expect(countSafeReportsPart2(parseRowsAsNumbers("65 64 68 71 72 75"))).toBe(
      1
    );
  });

  it("ex_2 analyzer case 402", () => {
    expect(countSafeReportsPart2(parseRowsAsNumbers("43 46 44 45 46"))).toBe(1);
  });
});
