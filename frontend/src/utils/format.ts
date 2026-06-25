export const formatMatchDate = (time: number) => {
  const formattedDate = new Date(time).toLocaleString("en-GB", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    timeZone: "Asia/Ho_Chi_Minh",
    hour: "2-digit",
    minute: "2-digit",
  });

  return formattedDate;
};

export const formatUTCString = (utcString: string): string => {
  const timestamp = new Date(utcString).getTime();

  const formattedDate = new Date(timestamp).toLocaleString("en-GB", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    timeZone: "Asia/Ho_Chi_Minh",
    hour: "numeric",
    minute: "numeric",
  });

  return formattedDate;
};
