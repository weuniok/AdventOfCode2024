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

export const filterProperUpdates = (
  rules: Rules,
  updates: Update[],
  getCorrect: boolean = true
): Update[] => {
  const properUpdates = updates.filter((update: Update) => {
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
    return getCorrect && !isThereMissingPage;
  });

  return properUpdates;
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
  const properUpdates = filterProperUpdates(rules, updates);
  const value = countPoints(properUpdates);

  return value;
};

export function performPart1() {
  readText("./src/day5/input.txt").then((text) => {
    const value = performPart1Routine(text);

    console.log(`Part 1 score: ${value}`);
  });
}

export function performPart2() {
  // readText("./src/day4/input.txt").then((text) => {
  //   const parsedRows = parseRowsAsStrings(text);
  //   const value = countCrossedMAS(parsedRows);
  //   console.log(`Part 2 score: ${value}`);
  // });
}

performPart1();
performPart2();
