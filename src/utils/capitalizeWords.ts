export const capitalizeWords = (mySentence: string): string => {
    const words = mySentence.split(" ");

    for (let i = 0; i < words.length; i++) {
        if (words[i] && !/^\d+$/.test(words[i])) {
            words[i] = words[i][0].toUpperCase() + words[i].substr(1);
        }
    }

    return words.join(" ");
}
