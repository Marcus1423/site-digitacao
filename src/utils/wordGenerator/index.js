import wordData from '../../languages/portuguese_1K.json';
  
const words = wordData.words;

export function getRandomWords(count = 30) {
  return Array.from({ length: count }, () => {
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
  });
  }