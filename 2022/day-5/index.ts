import { readFileSync } from "fs";
import { join } from "path";

const input = readFileSync(join(__dirname, "./input.txt"), "utf-8").split(
  "\n\n"
);

const stacks: Record<number, string[]> = {};

input[0]
  .split("\n")
  .slice(0, -1)
  .map((c) => c.replace(/[[\]]/g, "").replaceAll("    ", " "))
  .map((c) => c.split(" "))
  .forEach((c) =>
    c.forEach((r, p) => {
      if (r !== "") {
        const place = p + 1;

        if (!stacks[place]) stacks[place] = [];

        stacks[place].push(r);
      }
    })
  );

const instructions = input[1]
  .split("\n")
  .map((i) => i.match(/\d+/g)!.map((n) => Number(n)));

export const parts = {
  1: () => {
    for (const line of instructions) {
      const [move, from, to] = line;

      const nums = stacks[from].splice(0, move);

      stacks[to].unshift(...nums.reverse());
    }

    const answer = Object.values(stacks)
      .map((s) => s[0])
      .join("");

    console.log("ANSWER:", answer);
  },
  2: () => {
    for (const line of instructions) {
      const [move, from, to] = line;

      const nums = stacks[from].splice(0, move);

      stacks[to].unshift(...nums);
    }

    const answer = Object.values(stacks)
      .map((s) => s[0])
      .join("");

    console.log("ANSWER:", answer);
  },
};
