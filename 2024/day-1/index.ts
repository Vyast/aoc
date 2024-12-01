import { join } from "path";
import { readFileSync } from "fs";

const input = readFileSync(join(__dirname, "./input.txt"), "utf-8")
  .split("\n")
  .map((e) => e.split("   "));

const leftArray = input.map((e) => Number(e[0])).sort((a, b) => a - b);
const rightArray = input.map((e) => Number(e[1])).sort((a, b) => a - b);

export const parts = {
  1: () => {
    let distance = 0;

    for (let i = 0; i < leftArray.length; i++) {
      const rightItem = rightArray[i];
      const leftItem = leftArray[i];

      const greaterNum = Math.max(leftItem, rightItem);
      const lesserNum = Math.min(leftItem, rightItem);

      distance += greaterNum - lesserNum;
    }

    console.log("ANSWER:", distance);
  },
  2: () => {
    let score = 0;

    const dupeNumsRight: Record<number, number> = {};

    for (let i = 0; i < rightArray.length; i++) {
      const num = rightArray[i];

      if (dupeNumsRight[num]) dupeNumsRight[num] += 1;
      else dupeNumsRight[num] = 1;
    }

    for (let i = 0; i < leftArray.length; i++) {
      const num = leftArray[i];

      const amount = dupeNumsRight[num];

      if (amount) score += num * amount;
    }

    console.log("ANSWER:", score);
  },
};
