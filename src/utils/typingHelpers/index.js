export const getWPM = (startTime, correctChars) => {
    const minutes = (Date.now() - startTime) / 1000 / 60;
    const wordsEquivalent = correctChars / 5;
    return Math.round(wordsEquivalent / minutes);
  };
  
  export const getCPM = (startTime, correctChars) => {
    const minutes = (Date.now() - startTime) / 1000 / 60;
    return Math.round(correctChars / minutes);
  };
  
  export const getAccuracy = (correctCount, currentWordIndex) => {
    const totalTyped = currentWordIndex > 0 ? currentWordIndex : 1;
    return Math.round((correctCount / totalTyped) * 100);
  };