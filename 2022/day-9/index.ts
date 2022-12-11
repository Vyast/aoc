import { readFileSync } from "fs";
import { join } from "path";

const input = readFileSync(join(__dirname, "./input.txt"), "utf-8");

const steps = input.split("\n");

export const parts = {
  1: () => {},
  2: () => {},
};
