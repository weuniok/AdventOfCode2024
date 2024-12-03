import * as fs from "fs";

export const readText = async (path: fs.PathLike) => {
  const text = await fs.promises.readFile(path, "utf-8");
  return text;
};
