import { join } from "path";
import { readFileSync } from "fs";

const input = readFileSync(join(__dirname, "./input.txt"), "utf-8");

export const parts = {
  1: () => {
    let sum = 0;

    const regex = /mul\((\d{1,3}),(\d{1,3})\)/g;

    let match;

    while ((match = regex.exec(input)) !== null) {
      sum += parseInt(match[1]) * parseInt(match[2]);
    }

    console.log("ANSWER:", sum);
  },
  2: () => {
    let sum = 0;

    const mulRegex = /mul\((\d{1,3}),(\d{1,3})\)/g;
    const doRegex = /do\(\)/g;
    const dontRegex = /don't\(\)/g;

    const instructions: {
      type: "mul" | "do" | "dont";
      value?: number;
      index: number;
    }[] = [];

    let match;

    while ((match = mulRegex.exec(input)) !== null) {
      instructions.push({
        value: parseInt(match[1]) * parseInt(match[2]),
        index: match.index,
        type: "mul",
      });
    }

    while ((match = doRegex.exec(input)) !== null) {
      instructions.push({
        index: match.index,
        type: "do",
      });
    }

    while ((match = dontRegex.exec(input)) !== null) {
      instructions.push({
        index: match.index,
        type: "dont",
      });
    }

    instructions.sort((a, b) => a.index - b.index);

    let enabled = true;

    for (const instruction of instructions) {
      switch (instruction.type) {
        case "do":
          enabled = true;
          break;
        case "dont":
          enabled = false;
          break;
        case "mul":
          if (enabled) {
            sum += instruction.value!;
          }
          break;
      }
    }

    console.log("ANSWER:", sum);
  },
};
