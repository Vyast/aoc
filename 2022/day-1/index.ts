import { join } from "path";
import { readFileSync } from "fs";

const input = readFileSync(join(__dirname, "./input.txt"), "utf-8").split("\n");

const elves: Array<number[]> = [];

for (let i = 0, sub: number[] = []; i < input.length; i++) {
  const line = input[i];

  if (line.length === 0) {
    elves.push(sub);
    sub = [];
  } else {
    sub.push(Number(line));

    if (i + 1 === input.length) {
      elves.push(sub);
      sub = [];
    }
  }
}

export const parts = {
  1: () => {
    let most_calories = undefined;

    for (let elf = 0; elf < elves.length; elf++) {
      const items = elves[elf];

      const total = items.reduce((value, item) => value + item, 0);

      if (!most_calories || total > most_calories) {
        most_calories = total;
      }
    }

    console.log("ANSWER:", most_calories);
  },
  2: () => {
    const totals: number[] = [];

    for (let elf = 0; elf < elves.length; elf++) {
      const items = elves[elf];

      const total = items.reduce((value, i) => {
        return value + i;
      }, 0);

      totals.push(total);
    }

    const top_3 = totals.sort((a, b) => b - a).slice(0, 3);

    const total_calories = top_3.reduce((value, item) => value + item, 0);

    console.log("ANSWER:", total_calories);
  },
};
