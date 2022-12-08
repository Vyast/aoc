import { readFileSync } from "fs";
import { join } from "path";

const input = readFileSync(join(__dirname, "./input.txt"), "utf-8");

const trees = input.split("\n").map((i) => i.split("").map((n) => Number(n)));

export const parts = {
  1: () => {
    let total = 0;

    trees.forEach((r, g) => {
      if (g === 0 || g === trees.length - 1) return;

      const topHalf = trees.slice(0, g);
      const bottomHalf = trees.slice(g + 1);

      r.forEach((t, s) => {
        if (s === 0 || s === r.length - 1) return;

        const leftHalf = r.slice(0, s);
        const rightHalf = r.slice(s + 1);

        const tallestLeft = t > Math.max(...leftHalf);
        const tallestRight = t > Math.max(...rightHalf);

        const tallestTop = topHalf.every((o) => t > o[s]);
        const tallestBottom = bottomHalf.every((o) => t > o[s]);

        if (tallestLeft || tallestRight || tallestTop || tallestBottom)
          total += 1;
      });
    });

    total += trees[0].length * 2;
    total += (trees.map((t) => t[0]).length - 2) * 2;

    console.log("ANSWER:", total);
  },
  2: () => {
    let highest = 0;

    const countUntilGTE = (limit: number, arr: number[]) => {
      let count = 0;

      for (let i = 0; i < arr.length; i++) {
        count++;

        if (arr[i] >= limit) break;
      }

      return count;
    };

    trees.forEach((row, rowIndex) => {
      const topHalf = trees.slice(0, rowIndex).reverse();
      const bottomHalf = trees.slice(rowIndex + 1);

      row.forEach((tree, treeIndex) => {
        const leftHalf = row.slice(0, treeIndex).reverse();
        const rightHalf = row.slice(treeIndex + 1);

        const leftCount = countUntilGTE(tree, leftHalf);
        const rightCount = countUntilGTE(tree, rightHalf);

        const topCount = countUntilGTE(
          tree,
          topHalf.map((o) => o[treeIndex])
        );
        const bottomCount = countUntilGTE(
          tree,
          bottomHalf.map((o) => o[treeIndex])
        );

        const score = leftCount * rightCount * topCount * bottomCount;

        if (score > highest) highest = score;
      });
    });

    console.log("ANSWER:", highest);
  },
};
