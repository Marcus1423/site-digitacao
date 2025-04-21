import './styles.css'

const Stats = ({ correct, total, wpm, cpm, accuracy, onRestart }) => {
  return (
    <div className="stats-container">
      <p>✅ Palavras corretas: {correct}</p>
      <p>🔤 Caracteres por minuto (CPM): {cpm}</p>
      <p>⌛ Palavras por minuto (WPM): {wpm}</p>
      <p>🎯 Precisão: {accuracy}%</p>
      <button className="restart-button" 
        onClick={onRestart}>🔁 Reiniciar
      </button>

    </div>
  );
};

export default Stats;

  