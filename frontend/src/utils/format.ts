export const formatMatchDate = (time: number) => {
  const formattedDate = new Date(time * 1000).toLocaleString("en-US", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    timeZone: "Asia/Ho_Chi_Minh",
    hour: "2-digit",
    minute: "2-digit",
  });

  return formattedDate;
};
