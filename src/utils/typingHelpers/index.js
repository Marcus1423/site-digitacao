export const getWPM = (startTime, correctChars) => {
  const minutes = (Date.now() - startTime) / 1000 / 60;
  const wordsEquivalent = correctChars / 5;
  return Math.round(wordsEquivalent / minutes);
};

export const getCPM = (startTime, correctChars) => {
  const minutes = (Date.now() - startTime) / 1000 / 60;
  return Math.round(correctChars / minutes);
};

// Precisão baseada em caracteres digitados corretamente vs. total digitado
export const getAccuracy = (correctChars, typedChars) => {
  const total = typedChars > 0 ? typedChars : 1;
  return Math.round((correctChars / total) * 100);
};