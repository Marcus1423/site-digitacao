import './styles.css'

const WordCountSelector = ({ wordCount, onChange }) => {
    return (
      <div className="word-count-selector">
        <label htmlFor="word-count">Quantidade de palavras:</label>
        <select
          id="word-count"
          value={wordCount}
          onChange={onChange}
        >
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={30}>30</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </div>
    );
  };
  
  export default WordCountSelector;