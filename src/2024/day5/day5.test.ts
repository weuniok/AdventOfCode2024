import { describe, it, expect } from "vitest";
import {
  countPoints,
  filterRelevantRules,
  filterUpdates,
  fixUpdates,
  parseRulesAndUpdates,
  performPart1Routine,
  performPart2Routine,
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
  const exampleInputBadUpdates = [
    [75, 97, 47, 61, 53],
    [61, 13, 29],
    [97, 13, 75, 29, 47],
  ];
  const exampleBadInputFixed = [
    [97, 75, 47, 61, 53],
    [61, 29, 13],
    [97, 75, 47, 29, 13],
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

  describe("RulesParser", () => {
    it("parses rules correctly", () => {
      const { rules, updates } = parseRulesAndUpdates(exampleInput);
      expect(rules).toEqual(exampleInputRules);
      expect(updates).toEqual(exampleInputAllUpdates);
    });
  });

  describe("UpdateFilter", () => {
    it("filters good updates", () => {
      const result = filterUpdates(
        exampleInputRules,
        exampleInputAllUpdates,
        true
      );
      expect(result).toEqual(exampleInputGoodUpdates);
    });

    it("filters good updates by default", () => {
      const result = filterUpdates(exampleInputRules, exampleInputAllUpdates);
      expect(result).toEqual(exampleInputGoodUpdates);
    });

    it("filters bad updates", () => {
      const result = filterUpdates(
        exampleInputRules,
        exampleInputAllUpdates,
        false
      );
      expect(result).toEqual(exampleInputBadUpdates);
    });
  });

  describe("PointsCounter", () => {
    it("counts points correctly"),
      () => {
        const result = countPoints(exampleInputGoodUpdates);
        expect(result).toBe(143);
      };
  });

  describe("UpdateFixed", () => {
    it("fixes bad updates", () => {
      const result = fixUpdates(exampleInputRules, exampleInputBadUpdates);
      expect(result).toEqual(exampleBadInputFixed);
    });
  });

  describe("RelevantRulesFilter", () => {
    it("filters relevant rules", () => {
      const rules = {1: [2,3], 2: [5,6], 7:[5,2]}
      const update = [1,2,3,4,5];
      const relevantRules = {1: [2,3], 2: [5]};
      const result = filterRelevantRules(rules, update);
      expect(result).toEqual(relevantRules);
    });
  })

  describe("Integration tests", () => {
    it("Part 1 should work on example", () => {
      const result = performPart1Routine(exampleInput);
      expect(result).toBe(exampleInputScore);
    });

    it("Part 2 should work on example", () => {
      const result = performPart2Routine(exampleInput);
      expect(result).toBe(123);
    });
  });
});
