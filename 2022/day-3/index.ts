import { readFileSync } from "fs";
import { join } from "path";

const input = readFileSync(join(__dirname, "./input.txt"), "utf-8");

const priority: Record<string, number> = {};

for (let i = 0; i < 26; i++) {
  priority[String.fromCharCode(97 + i)] = i + 1;
}

for (let i = 0; i < 26; i++) {
  priority[String.fromCharCode(97 + i).toUpperCase()] =
    Object.values(priority).length + 1;
}

export const parts = {
  1: () => {
    const rucksacks = input.split("\n").map((sack) => {
      const half = sack.length / 2;
      return [sack.slice(0, half), sack.slice(half)];
    });

    let total_sum = 0;

    for (const sack of rucksacks) {
      const [first, second] = sack;

      const matching = first
        .split("")
        .filter((char) => second.includes(char))[0];

      const sum = priority[matching];

      total_sum += sum;
    }

    console.log("ANSWER:", total_sum);
  },
  2: () => {
    const rucksacks = [];

    const arr = input.split("\n"),
      slice = 3;

    for (let i = 0; i < arr.length; i += slice)
      rucksacks.push(arr.slice(i, i + slice));

    let total_sum = 0;

    for (const sack of rucksacks) {
      const [one, two, three] = sack;

      const firstTwo = one.split("").filter((char) => two.includes(char));

      const matching = firstTwo.filter((char) => three.includes(char))[0];

      const sum = priority[matching];

      total_sum += sum;
    }

    console.log("ANSWER:", total_sum);
  },
};
