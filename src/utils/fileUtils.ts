import * as fs from "fs";

export const readText = async (path: fs.PathLike) => {
  const text = await fs.promises.readFile(path, "utf-8");
  return text;
};

export const parseRowsAsNumbers = (text: string) => {
  return text
    .split("\n")
    .map((line) => {
      line = line.replace(/#.*/, "").trim();
      if (!line) return;
      return line.split(" ").map(Number);
    })
    .filter((line) => line !== undefined);
};

export const parseRowsAsStrings = (text: string) => {
  return text
    .split("\n")
    .map((line) => {
      line = line.replace(/#.*/, "").trim();
      if (!line) return;
      return line;
    })
    .filter((line) => line !== undefined);
};
