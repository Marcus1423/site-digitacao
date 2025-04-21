import './App.css';
import { useEffect, useState } from 'react';
import WordDisplay from './components/WordDisplay';
import Stats from './components/Stats';
import WpmChart from './components/WpmChart';

import { useTypingLogic } from './hooks/useTypingLogic';
import { useTypingTimer } from './hooks/useTypingTimer';
import { getWPM, getCPM, getAccuracy } from './utils/typingHelpers';
import WordCountSeletor from './components/WordCountSeletor';

function App() {
  const [wordCount, setWordCount] = useState(30); // nova opção de controle

  const {
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
  } = useTypingLogic(wordCount); // passando wordCount pro hook

  useEffect(() => {
    inputRef.current?.focus();
  }, [isFinished, inputRef]);

  useTypingTimer({ startTime, isFinished, correctChars, setWpmHistory });

  const handleWordCountChange = (e) => {
    const newCount = Number(e.target.value);
    setWordCount(newCount);
    resetTest(newCount); // reinicia com nova quantidade
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
              accuracy={getAccuracy(correctCount, currentWordIndex)}
              onRestart={() => resetTest(wordCount)}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
