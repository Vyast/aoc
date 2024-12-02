import { join } from "path";
import { readFileSync } from "fs";

const input = readFileSync(join(__dirname, "./input.txt"), "utf-8")
  .split("\n")
  .map((e) => e.split(/\s+/).map(Number));

const isRowSafe = (row: number[]) => {
  let asc = row[0] - row[1] < 0;
  let previous;

  for (let r = 0; r < row.length; r++) {
    const curr = row[r];

    const inFront = row[r + 1];

    if (inFront) {
      const diff = Math.abs(curr - inFront);

      if (diff < 1 || diff > 3) {
        return false;
      }
    }

    if (previous) {
      if ((asc && curr <= previous) || (!asc && curr >= previous)) {
        return false;
      }
    }

    previous = curr;
  }

  return true;
};

export const parts = {
  1: () => {
    let safe = 0;

    for (let i = 0; i < input.length; i++) {
      if (isRowSafe(input[i])) safe++;
    }

    console.log("ANSWER:", safe);
  },
  2: () => {
    let safe = 0;

    for (let i = 0; i < input.length; i++) {
      const row = input[i];

      if (isRowSafe(row)) {
        safe++;
        continue;
      }

      for (let n = 0; n < row.length; n++) {
        if (isRowSafe(row.toSpliced(n, 1))) {
          safe++;
          break;
        }
      }
    }

    console.log("ANSWER:", safe);
  },
};
