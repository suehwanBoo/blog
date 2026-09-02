const monthStr: { [key: string]: string } = {
  "01": "Jan",
  "02": "Feb",
  "03": "Mar",
  "04": "Apr",
  "05": "May",
  "06": "Jun",
  "07": "July",
  "08": "Aug",
  "09": "Sep",
  "10": "Oct",
  "11": "Nov",
  "12": "Dec",
};

export const makeDateString = (createdAt: string) => {
  const date = [
    createdAt.substring(0, 4),
    createdAt.substring(5, 7),
    createdAt.substring(8, 10),
  ] as [string, string, string];
  const dateString = `${date[2]} ${monthStr[date[1]]} ${date[0]}`;
  return dateString;
};
