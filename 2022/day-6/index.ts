import { readFileSync } from "fs";
import { join } from "path";

const input = readFileSync(join(__dirname, "./input.txt"), "utf-8").split("");

export const parts = {
  1: () => {
    const inc = 4;

    for (let i = inc - 1; i < input.length; i++) {
      if (new Set(input.slice(i - inc, i)).size === inc) {
        return console.log("ANSWER:", i);
      }
    }
  },
  2: () => {
    const inc = 14;

    for (let i = inc - 1; i < input.length; i++) {
      if (new Set(input.slice(i - inc, i)).size === inc) {
        return console.log("ANSWER:", i);
      }
    }
  },
};
