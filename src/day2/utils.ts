export const parseInput = (text: string) => {
  return text
    .split("\n")
    .map((line) => {
      line = line.replace(/#.*/, "").trim();
      if (!line) return;
      return line.split(" ").map(Number);
    })
    .filter((line) => line !== undefined);
};
