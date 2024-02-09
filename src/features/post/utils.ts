import {formatDistance} from "date-fns";

// theory : https://stackoverflow.com/questions/4216752/anyone-having-any-leads-on-a-reading-time-algorithm
export const calculateReadDuration = (text = "") => {
  // Get the total word count
  const wordCount = text.split(" ").length;

  // Calculate the minutes and seconds
  let minutes = Math.floor(wordCount / 200);
  const seconds = Math.round(((wordCount % 200) / 200) * 60);

  // Round up to the next minute if seconds are greater than 30
  if (seconds > 30) {
    minutes += 1;
  }
  return {minutes, seconds};
};

export const getRelativeDate = (date: Date) => {
  return formatDistance(date, Date.now(), {addSuffix: true});
};
