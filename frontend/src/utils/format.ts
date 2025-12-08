export const formatMatchDate = (time: number) => {
  const formattedDate = new Date(time * 1000).toLocaleString("en-US", {
    day: "2-digit",
    month: "numeric",
    year: "2-digit",
    timeZone: "Asia/Ho_Chi_Minh",
    hour: "2-digit",
    minute: "2-digit",
  });

  return formattedDate;
};
