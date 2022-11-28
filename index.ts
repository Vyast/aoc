import { day_to_solve, current_year } from "./config.json";

const main = async () => {
  try {
    const module: {
      a: () => Promise<void>;
      b: () => Promise<void>;
    } = await import(`./${current_year}/${day_to_solve}`);

    await module.a();
    await module.b();
  } catch (error: any) {
    throw new Error(error.message);
  }
};

main();
