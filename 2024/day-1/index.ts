import { join } from "path";
import { readFileSync } from "fs";

const input = readFileSync(join(__dirname, "./input.txt"), "utf-8").split(
  "\n\n"
);

const elves = input.map((line) => line.split("\n").map((str) => Number(str)));

export const parts = {
  1: () => {
    let most_calories = 0;

    for (const elf of elves) {
      const total = elf.reduce((value, item) => value + item, 0);

      if (total > most_calories) most_calories = total;
    }

    console.log("ANSWER:", most_calories);
  },
  2: () => {
    const totals: number[] = [];

    for (const elf of elves) {
      const total = elf.reduce((value, item) => value + item, 0);

      totals.push(total);
    }

    const top_3 = totals.sort((a, b) => b - a).slice(0, 3);

    const total_calories = top_3.reduce((value, item) => value + item, 0);

    console.log("ANSWER:", total_calories);
  },
};
