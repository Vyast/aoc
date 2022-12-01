import { day_to_solve, current_year, part_to_solve } from "./config.json";

const main = async () => {
  try {
    const module: {
      parts: { [part: number]: () => Promise<void> };
    } = await import(`./${current_year}/day-${day_to_solve}`);

    await module.parts[part_to_solve]();

    console.log("Finished!");
  } catch (error: any) {
    throw new Error(error.message);
  }
};

main();
