import { useEffect } from 'react';

export const useTypingTimer = ({ startTime, isFinished, correctChars, setWpmHistory }) => {
  useEffect(() => {
    let interval;

    if (startTime && !isFinished) {
      interval = setInterval(() => {
        const minutes = (Date.now() - startTime) / 1000 / 60;
        const wordsEquivalent = correctChars / 5;
        const currentWpm = Math.round(wordsEquivalent / minutes);

        setWpmHistory((prev) => [
          ...prev,
          {
            time: ((Date.now() - startTime) / 1000).toFixed(1),
            wpm: currentWpm,
          },
        ]);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [startTime, isFinished, correctChars, setWpmHistory]);
};