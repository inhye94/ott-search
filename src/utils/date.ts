export const getYear = (date: string) => {
  if (!date) return;

  return date.split("-")[0];
};
