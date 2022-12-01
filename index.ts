import { day_to_solve, current_year, part_to_solve } from "./config.json";

const main = async () => {
  try {
    const module: {
      one: () => Promise<void>;
      two: () => Promise<void>;
    } = await import(`./${current_year}/${day_to_solve}`);

    const part =
      part_to_solve === 1 ? "one" : part_to_solve === 2 ? "two" : undefined;

    if (!part) throw new Error(`Invalid config field: ${part_to_solve}`);

    const func = module[part];

    await func();
  } catch (error: any) {
    throw new Error(error.message);
  }
};

main();
