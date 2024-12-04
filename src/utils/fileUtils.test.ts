import { describe, it, expect } from "vitest";
import { parseRowsAsNumbers, parseRowsAsStrings } from "./fileUtils";

describe("parseRowsAsNumbers", () => {
  const SIMPLE = `
  7 6 4 2 1
  1 2 7 8 9
  9 7 6 2 1
  1 3 2 4 5
  8 6 4 4 1
  1 3 6 7 9
  `;

  it("parses inputs", () => {
    expect(parseRowsAsNumbers(SIMPLE)).toEqual([
      [7, 6, 4, 2, 1],
      [1, 2, 7, 8, 9],
      [9, 7, 6, 2, 1],
      [1, 3, 2, 4, 5],
      [8, 6, 4, 4, 1],
      [1, 3, 6, 7, 9],
    ]);
  });

  it("ignores comments", () => {
    expect(parseRowsAsNumbers("1 2 3 4 5 # 6 7 8 9")).toEqual([
      [1, 2, 3, 4, 5],
    ]);
  });
});

describe("parseRowsAsStrings", () => {
  const SIMPLE = `
  7 6 4 2 1
  1 2 7 8 9
  `;

  it("parses inputs", () => {
    expect(parseRowsAsStrings(SIMPLE)).toEqual(["7 6 4 2 1", "1 2 7 8 9"]);
  });

  it("ignores comments", () => {
    expect(parseRowsAsStrings("1 2 3 4 5 # 6 7 8 9")).toEqual(["1 2 3 4 5"]);
  });
});
