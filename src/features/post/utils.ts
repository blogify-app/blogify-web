// theory : https://stackoverflow.com/questions/4216752/anyone-having-any-leads-on-a-reading-time-algorithm
import {CategoryOption} from "@/features/post/types";
import {Category} from "@/services/api/gen";

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

export const optionToData = (options: CategoryOption[]): Category[] => {
  return options.map((option) => ({
    id: option.value,
    label: option.label,
  }));
};

export const dataToOption = (categories: Category[]): CategoryOption[] => {
  return categories.map((category) => ({
    value: category.id,
    label: category.label,
  }));
};
