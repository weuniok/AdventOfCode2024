import { readText } from "../utils/fileUtils";

export function cleanText(
  input: string,
  useDisabling: boolean = false
): string[] {
  const regexForMuls = "mul\\(\\d+,\\d+\\)";
  const regexForDonts = "don't\\(\\)";
  const regexForDos = "do\\(\\)";

  const combinedRegex = useDisabling
    ? new RegExp(`${regexForMuls}|${regexForDonts}|${regexForDos}`, "g")
    : new RegExp(`${regexForMuls}`, "g");

  const parsedInput = input.match(combinedRegex);

  return parsedInput || [];
}

export function disableCommands(commands: string[]): string[] {
  let enabled = true;
  const parsedCommands = commands
    .map((command) => {
      switch (command) {
        case "do()":
          enabled = true;
          break;
        case "don't()":
          enabled = false;
          break;
        default: // mul(x,y)
          if (enabled) return command;
          break;
      }
      return undefined;
    })
    .filter((command) => command !== undefined);

  return parsedCommands;
}

export function performMul(mullString: string) {
  const inputs = mullString.match(/\d+/g)?.map(Number) || [];
  const mulValue = inputs[0] * inputs[1];
  return mulValue;
}

export function parseMultiplications(multiplications: string[]): number {
  const score = multiplications.reduce((acc, curr) => {
    return acc + performMul(curr);
  }, 0);
  return score;
}

export function performPart1() {
  readText("./src/day3/input.txt").then((text) => {
    const cleanedText = cleanText(text, false);
    const value = parseMultiplications(cleanedText);
    console.log(`Part 1 score: ${value}`);
  });
}

export function performPart2() {
  readText("./src/day3/input.txt").then((text) => {
    const cleanedText = cleanText(text, true);
    const parsedCommands = disableCommands(cleanedText);
    const value = parseMultiplications(parsedCommands);
    console.log(`Part 2 score: ${value}`);
  });
}

performPart1();
performPart2();
