import { useState, useRef } from 'react';
import { getRandomWords } from '../../utils/wordGenerator';

export const useTypingLogic = (totalWords = 30) => {
  const [words, setWords] = useState(() => getRandomWords(totalWords));
  const [currentInput, setCurrentInput] = useState('');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [isFinished, setIsFinished] = useState(false);
  const [correctChars, setCorrectChars] = useState(0);
  const [wpmHistory, setWpmHistory] = useState([]);

  const inputRef = useRef();

  const handleChange = (e) => {
    const value = e.target.value;
    if (!startTime) setStartTime(Date.now());

    if (value.endsWith(' ')) {
      const trimmed = value.trim();
      const currentWord = words[currentWordIndex];

      if (trimmed === currentWord) {
        setCorrectCount((c) => c + 1);
      }

      let matchedChars = 0;
      for (let i = 0; i < Math.min(trimmed.length, currentWord.length); i++) {
        if (trimmed[i] === currentWord[i]) {
          matchedChars++;
        }
      }
      setCorrectChars((prev) => prev + matchedChars);

      const nextIndex = currentWordIndex + 1;
      if (nextIndex >= words.length) {
        setIsFinished(true);
      } else {
        setCurrentWordIndex(nextIndex);
        setCurrentInput('');
      }
    } else {
      setCurrentInput(value);
    }
  };

  const resetTest = (newTotal = totalWords) => {
    setWords(getRandomWords(newTotal));
    setCurrentInput('');
    setCurrentWordIndex(0);
    setCorrectCount(0);
    setCorrectChars(0);
    setStartTime(null);
    setIsFinished(false);
    setWpmHistory([]);
    inputRef.current?.focus();
  };

  return {
    words,
    currentInput,
    currentWordIndex,
    correctCount,
    startTime,
    isFinished,
    correctChars,
    wpmHistory,
    inputRef,
    handleChange,
    resetTest,
    setWpmHistory,
  };
};