export const DATE_FORMAT_OPTIONS: Intl.DateTimeFormatOptions = {
  day: "numeric",
  month: "short",
  year: "numeric",
};

export function formatDate(date: string): string {
  const dateObject: Date = new Date(date);

  if (isNaN(dateObject.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat("en-GB", DATE_FORMAT_OPTIONS).format(
    dateObject
  );
}
