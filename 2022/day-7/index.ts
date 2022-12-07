import { readFileSync } from "fs";
import { join } from "path";

const input = readFileSync(join(__dirname, "./input.txt"), "utf-8");

const commands = input.split("\n");

const directories: Record<string, number[]> = {};

const max = 100000;

let currentDir: string;
let lastDir: string;

commands.forEach((c) => {
  if (c.startsWith("$")) {
    const cmds = c.split(" ").slice(1);

    const [cmd, action] = cmds;

    if (cmd === "cd") {
      if (action === "..") {
        currentDir = lastDir;
      } else {
        lastDir = currentDir ?? action;
        currentDir = action;
      }
    } else if (cmd === "ls") {
    }
  } else if (c.startsWith("dir")) {
  } else {
    if (!directories[currentDir]) {
      directories[currentDir] = [];
    }

    directories[currentDir].push(Number(c.split(" ")[0]));
  }

  //console.log(c, "----", currentDir, lastDir);
});

export const parts = {
  1: () => {
    let sum = 0;

    //console.log(directories, "directories");

    const sums = Object.values(directories).map((d) =>
      d.reduce((a, b) => a + b, 0)
    );

    for (const value of sums) {
      if (value <= max) sum += value;
    }

    console.log("ANSWER:", sum);
  },
  2: () => {},
};
