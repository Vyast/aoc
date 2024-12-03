const main = async () => {
  try {
    const date = new Date();

    const module: {
      parts: { [part: number]: () => Promise<void> };
    } = await import(`./${date.getFullYear()}/day-3`);

    module.parts[1]();
    module.parts[2]();

    console.log("Finished!");
  } catch (error) {
    console.error(error);
  }
};

main();
