import { readFileSync } from "fs";
import { join } from "path";

const input = readFileSync(join(__dirname, "./input.txt"), "utf-8");

const sections = input
  .split("\n")
  .map((e) => e.split(",").map((n) => n.split("-").map((i) => Number(i))));

export const parts = {
  1: () => {
    let total = 0;

    for (const section of sections) {
      const [one, two] = section;

      if (one[0] >= two[0] && one[1] <= two[1]) total += 2;
    }

    console.log("ANSWER:", total);
  },
  2: () => {
    let total = 0;

    for (const section of sections) {
      const [one, two] = section;

      if (one[0] <= two[1] && two[0] <= one[1]) total++;
    }

    console.log("ANSWER:", total);
  },
};
