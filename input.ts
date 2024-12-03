import fs from "fs";
import path from "path";
import "dotenv/config";

const input = async () => {
  try {
    if (!process.env.SESSION_COOKIE) {
      throw new Error("SESSION_COOKIE not found");
    }

    const date = new Date();

    const resp = await fetch(
      `https://adventofcode.com/${date.getFullYear()}/day/3/input`,
      {
        headers: {
          Cookie: `session=${process.env.SESSION_COOKIE}`,
        },
      }
    );

    const text = await resp.text();

    const targetDir = path.join(
      process.cwd(),
      date.getFullYear().toString(),
      "day-3"
    );
    const filePath = path.join(targetDir, "input.txt");

    fs.mkdirSync(targetDir, { recursive: true });

    fs.writeFileSync(filePath, text.trimEnd(), "utf8");

    console.log(`Successfully wrote input to ${filePath}`);
  } catch (error) {
    console.error(error);
  }
};

input();
