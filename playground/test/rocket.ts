

export const Rocket = (astronaut: string) => {
  let isInSpace = false;
  let boostersLanded = false;
  const launchedAstronaut = astronaut;

  console.log(">>>>>", astronaut);
  return {
    launch: () => {
      isInSpace = true;
      boostersLanded = true;
    },
    isInSpace: () => isInSpace,
    whoIsInSpace: () => launchedAstronaut,
    boostersLanded: () => boostersLanded
  };
};
