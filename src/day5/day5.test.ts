import { describe, it, expect } from "vitest";
import {
  countPoints,
  filterProperUpdates,
  parseRulesAndUpdates,
  performPart1Routine,
} from "./day5";

describe("Advent of Code 2024 Day 5", () => {
  const exampleInput = `
47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47
  `;
  const exampleInputGoodUpdates = [
    [75, 47, 61, 53, 29],
    [97, 61, 53, 29, 13],
    [75, 29, 13],
  ];
  const exampleInputAllUpdates = [
    [75, 47, 61, 53, 29],
    [97, 61, 53, 29, 13],
    [75, 29, 13],
    [75, 97, 47, 61, 53],
    [61, 13, 29],
    [97, 13, 75, 29, 47],
  ];
  const exampleInputRules = {
    53: [47, 75, 61, 97],
    13: [97, 61, 29, 47, 75, 53],
    61: [97, 47, 75],
    47: [97, 75],
    29: [75, 97, 53, 61, 47],
    75: [97],
  };
  const exampleInputScore = 143;

  describe("Part 1", () => {
    it("parsesRulesCorrectly", () => {
      const { rules, updates } = parseRulesAndUpdates(exampleInput);
      expect(rules).toEqual(exampleInputRules);
      expect(updates).toEqual(exampleInputAllUpdates);
    });

    it("filtersProperly", () => {
      const result = filterProperUpdates(
        exampleInputRules,
        exampleInputAllUpdates
      );
      expect(result).toEqual(exampleInputGoodUpdates);
    });

    it("countsPointsCorrectly"),
      () => {
        const result = countPoints(exampleInputGoodUpdates);
        expect(result).toBe(143);
      };

    it("should work on example", () => {
      const result = performPart1Routine(exampleInput);
      expect(result).toBe(exampleInputScore);
    });
  });
});
