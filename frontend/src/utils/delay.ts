export const delayForLoading = async (promise: any, time = 1000) => {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, time);
  }).then(() => promise);
};
