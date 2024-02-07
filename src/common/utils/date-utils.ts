export function formatDate(date: string): string {
  const dateObject: Date = new Date(date);

  if (isNaN(dateObject.getTime())) {
    return "";
  }

  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  return new Intl.DateTimeFormat("en-GB", options).format(dateObject);
}
