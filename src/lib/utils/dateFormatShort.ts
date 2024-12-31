import { formatInTimeZone } from "date-fns-tz";

const dateFormat = (
  date: Date | string,
  format: string = "MMM, yyyy",
): string => {
  return formatInTimeZone(date, "Europe/Berlin", format);
};

export default dateFormat;
