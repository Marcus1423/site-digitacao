import { useEffect, useState } from 'react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../../firebase';

function GlobalResults() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const resultsRef = collection(db, 'testResults');
        const q = query(resultsRef, orderBy('date', 'desc'));

        const querySnapshot = await getDocs(q);

        const fetchedResults = querySnapshot.docs
          .map(doc => ({ id: doc.id, ...doc.data() }))
          .filter(result => result.date && typeof result.date.toDate === 'function'); // filtra apenas os que têm Timestamp válido

        setResults(fetchedResults);
      } catch (error) {
        console.error('Erro ao buscar resultados globais:', error);
      }
    };

    fetchResults();
  }, []);

  return (
    <div className="results-page">
      <h1>Resultados Globais</h1>
      {results.length === 0 ? (
        <p>Nenhum resultado encontrado.</p>
      ) : (
        <div className="results-table-container">
          <table className="results-table">
            <thead>
              <tr>
                <th>Palavras Corretas</th>
                <th>WPM</th>
                <th>CPM</th>
                <th>Precisão (%)</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result) => (
                <tr key={result.id}>
                  <td>{result.correctCount}</td>
                  <td>{result.wpm}</td>
                  <td>{result.cpm}</td>
                  <td>{result.accuracy}</td>
                  <td>{result.date.toDate().toLocaleString('pt-BR')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default GlobalResults;