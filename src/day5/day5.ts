import { parseRowsAsStrings, readText } from "../utils/fileUtils";

type Rules = { [value: number]: number[] };
type Update = number[];

export const parseRulesAndUpdates = (text: string) => {
  const rules: Rules = {};
  const updates: Update[] = [];

  text.split("\n").forEach((line) => {
    if (line.includes("|")) {
      const [requiredPage, page] = line.split("|");
      rules[parseInt(page)] == undefined
        ? (rules[parseInt(page)] = [parseInt(requiredPage)])
        : rules[parseInt(page)].push(parseInt(requiredPage));
    }
    if (line.includes(",")) {
      updates.push(line.split(",").map(Number));
    }
  });

  return { rules, updates };
};

export const filterUpdates = (
  rules: Rules,
  updates: Update[],
  getCorrect: boolean = true
): Update[] => {
  const filteredUpdates = updates.filter((update: Update) => {
    const printedPages: { [pageNumber: number]: boolean } = {};
    const requiredPages: { [pageNumber: number]: boolean } = {};
    update
      .slice()
      .reverse()
      .forEach((page) => {
        printedPages[page] = true;
        requiredPages[page] = false;
        const requirements = rules[page];
        requirements?.forEach((requiredPage) => {
          requiredPages[requiredPage] = true;
        });
      });
    const isThereMissingPage = Object.keys(requiredPages).find((page) => {
      return (
        requiredPages[Number(page)] === true && // Page is missing
        printedPages[Number(page)] !== undefined // but was already printed
      );
    });
    return getCorrect ? !isThereMissingPage : isThereMissingPage;
  });

  return filteredUpdates;
};

export const countPoints = (updates: Update[]): number => {
  const points: number = updates.reduce((scoreCounter, update) => {
    const middleIndex = Math.floor(update.length / 2);
    return scoreCounter + update[middleIndex];
  }, 0);

  return points;
};

export const performPart1Routine = (text: string) => {
  const { rules, updates } = parseRulesAndUpdates(text);
  const properUpdates = filterUpdates(rules, updates);
  const value = countPoints(properUpdates);

  return value;
};

export const filterRelevantRules = (rules: Rules, update: Update): Rules => {
  const updateRelevantRules: Rules = {};
  Object.keys(rules).forEach((rulePage) => {
    if (!update.includes(Number(rulePage))) return;

    updateRelevantRules[Number(rulePage)] = rules[Number(rulePage)].filter(
      (requiredPage) => update.includes(requiredPage)
    );
  });

  return updateRelevantRules;
};

export const fixUpdates = (rules: Rules, updates: Update[]): Update[] => {
  const fixedUpdates = updates.map((update) => {
    const thisCaseRules: Rules = filterRelevantRules(rules, update);

    const properUpdate = update.toSorted(
      (a, b) =>
        (thisCaseRules[a]?.length || 0) - (thisCaseRules[b]?.length || 0)
    );
    return properUpdate;
  });

  return fixedUpdates;
};

export const performPart2Routine = (text: string) => {
  const { rules, updates } = parseRulesAndUpdates(text);
  const improperUpdates = filterUpdates(rules, updates, false);

  const fixedUpdates = fixUpdates(rules, improperUpdates);
  const value = countPoints(fixedUpdates);

  return value;
};

export function performPart1() {
  readText("./src/day5/input.txt").then((text) => {
    const value = performPart1Routine(text);

    console.log(`Part 1 score: ${value}`);
  });
}

export function performPart2() {
  readText("./src/day5/input.txt").then((text) => {
    const value = performPart2Routine(text);

    console.log(`Part 2 score: ${value}`);
  });
}

performPart1();
performPart2();
