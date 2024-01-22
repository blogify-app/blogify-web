// theory : https://stackoverflow.com/questions/4216752/anyone-having-any-leads-on-a-reading-time-algorithm
export const calculateReadTime = (text: string) => {
    // Get the total word count
    const wordCount = text.split(" ").length;

    // Calculate the minutes and seconds
    let minutes = Math.floor(wordCount / 200);
    let seconds = Math.round(((wordCount % 200) / 200) * 60);

    // Round up to the next minute if seconds are greater than 30
    if (seconds > 30) {
        minutes += 1;
    }
    return { minutes, seconds };
}