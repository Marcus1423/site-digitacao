import './styles.css'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { getUserId } from '../../utils/userId';

function Results() {
  const [results, setResults] = useState([]);
  const [selectedWordCount, setSelectedWordCount] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const userId = getUserId();

        const resultsRef = collection(db, 'testResults');
        const q = query(
          resultsRef,
          where('userId', '==', userId),
          orderBy('date', 'desc')
        );

        const querySnapshot = await getDocs(q);
        const fetchedResults = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            date: data.date?.toDate()
          };
        });

        setResults(fetchedResults);
      } catch (error) {
        console.error('Erro ao buscar resultados:', error);
      }
    };

    fetchResults();
  }, []);

  function formatDuration(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  }

  // Filtrar os resultados conforme o select
 const wordCounts = [...new Set(
  results
    .map(result => result.wordCount)
    .filter(count => typeof count === 'number' && !isNaN(count))
)];
  const filteredResults = selectedWordCount
    ? results.filter(result => result.wordCount === Number(selectedWordCount))
    : results;

  return (
    <div className="results-page">
      <h1>Resultados</h1>
      {results.length === 0 ? (
        <p>Nenhum resultado encontrado.</p>
      ) : (
        <div className="results-table-container">
          <table className="results-table">
            <thead>
              <tr>
                 <th>
                  <select
                    value={selectedWordCount}
                    onChange={(e) => setSelectedWordCount(e.target.value)}
                    className="word-count-select"
                  >
                    <option value="">Qtd. Palavras</option>
                    <option value="">Todas</option>
                    {wordCounts.map((count) => (
                      <option key={count} value={count}>
                        {count}
                      </option>
                    ))}
                  </select>
                </th>
                <th>Palavras Corretas</th>
                <th>WPM</th>
                <th>CPM</th>
                <th>Precisão (%)</th>
                <th>Duração</th>
               
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              {filteredResults.map((result) => (
                <tr key={result.id}>
                  <td>{result.wordCount ?? '-'}</td>
                  <td>{result.correctCount}</td>
                  <td>{result.wpm}</td>
                  <td>{result.cpm}</td>
                  <td>{result.accuracy}</td>
                  <td>{result.duration != null ? formatDuration(result.duration) : '-'}</td>
                  <td>
                    {result.date?.toLocaleString('pt-BR', {
                      dateStyle: 'short',
                      timeStyle: 'short',
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="button-container">
        <button 
          className="view-home-button" 
          onClick={() => navigate('/site-digitacao')}
        >
          Página Inicial
        </button>
      </div>
    </div>
  );
}

export default Results;