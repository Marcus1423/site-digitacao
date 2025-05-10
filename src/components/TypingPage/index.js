import './styles.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WordDisplay from '../../components/WordDisplay';
import Stats from '../../components/Stats';
import WpmChart from '../../components/WpmChart';
import { serverTimestamp } from "firebase/firestore";

import { useTypingLogic } from '../../hooks/useTypingLogic';
import { useTypingTimer } from '../../hooks/useTypingTimer';
import { getWPM, getCPM, getAccuracy } from '../../utils/typingHelpers';
import WordCountSeletor from '../../components/WordCountSeletor';
import { saveTestResult } from '../../utils/saveTestResult.js';
import { getUserId } from '../../utils/userId/index.js';

function TypingPage() {
  const [wordCount, setWordCount] = useState(30);
  const navigate = useNavigate();

  const {
    words,
    currentInput,
    currentWordIndex,
    correctCount,
    startTime,
    endTime,
    isFinished,
    correctChars,
    typedChars,
    wpmHistory,
    inputRef,
    handleChange,
    resetTest,
    setWpmHistory,
  } = useTypingLogic(wordCount);

  // Cálculo do tempo total em segundos
  const getDurationInSeconds = () => {
    if (!startTime || !endTime) return 0;
    return Math.round((endTime - startTime) / 1000);
  };

  useEffect(() => {
    if (!isFinished) {
      inputRef.current?.focus();
    } else {
      const duration = getDurationInSeconds();

      const wpm = getWPM(startTime, correctChars);
      const cpm = getCPM(startTime, correctChars);
      const accuracy = getAccuracy(correctChars, typedChars);

      saveTestResult({
        wpm,
        cpm,
        accuracy,
        correctCount,
        duration, // novo campo
        date: serverTimestamp(),
        userId: getUserId(),
        wordCount: words.length,
      });
    }
  }, [isFinished]);

  useTypingTimer({ startTime, isFinished, correctChars, setWpmHistory });

  const handleWordCountChange = (e) => {
    const newCount = Number(e.target.value);
    setWordCount(newCount);
    resetTest(newCount);
  };

  return (
    <div className="app-container">
      <div className="typing-area">
        {!isFinished && (
          <>
            <WordCountSeletor 
              wordCount={wordCount}
              onChange={handleWordCountChange}
            />

            <WordDisplay
              words={words}
              currentInput={currentInput}
              currentWordIndex={currentWordIndex}
            />
            <input
              ref={inputRef}
              type="text"
              value={currentInput}
              onChange={handleChange}
              className="input-box"
              disabled={isFinished}
            />
          </>
        )}

        {isFinished && (
          <>
            <WpmChart data={wpmHistory} />
            <Stats
              correct={correctCount}
              total={words.length}
              wpm={getWPM(startTime, correctChars)}
              cpm={getCPM(startTime, correctChars)}
              accuracy={getAccuracy(correctChars, typedChars)}
              duration={getDurationInSeconds()} // mostrar na interface
              onRestart={() => resetTest(wordCount)}
            />
            <button 
              className="view-results-button" 
              onClick={() => navigate('/results')}
            >
              Ver Resultados
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default TypingPage;