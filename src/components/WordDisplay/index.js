import { useEffect, useRef } from 'react';
import './styles.css'

const MAX_VISIBLE_WORDS = 40;

const WordDisplay = ({ words, currentInput, currentWordIndex }) => {
  const start = Math.max(0, currentWordIndex - MAX_VISIBLE_WORDS + 9);
  const visibleWords = words.slice(start, currentWordIndex + 40); // Exibe um pouco à frente

  const containerRef = useRef();

  useEffect(() => {
    containerRef.current?.scrollTo({
      top: containerRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [currentWordIndex]);

  return (
    <div className="word-display">
      {visibleWords.map((word, i) => {
        const actualIndex = start + i;

        if (actualIndex === currentWordIndex) {
          return (
            <span key={actualIndex} className="current-word">
              {word.split('').map((char, j) => {
                let charClass = '';
                if (j < currentInput.length) {
                  charClass = currentInput[j] === char ? 'char-correct' : 'char-incorrect';
                }
                return (
                  <span key={j} className={charClass}>
                    {char}
                  </span>
                );
              })}{' '}
            </span>
          );
        } else if (actualIndex < currentWordIndex) {
          return (
            <span key={actualIndex} className="correct-word">
              {word + ' '}
            </span>
          );
        } else {
          return <span key={actualIndex}>{word + ' '}</span>;
        }
      })}
    </div>
  );
};

export default WordDisplay;