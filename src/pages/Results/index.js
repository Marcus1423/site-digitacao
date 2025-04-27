import './styles.css'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase'; // seu arquivo de configuração do Firebase
import { collection, getDocs } from 'firebase/firestore';

function Results() {
  const [results, setResults] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'testResults')); // Aqui corrigido
        const fetchedResults = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        console.log(fetchedResults); // para ver se buscou certo
        setResults(fetchedResults);
      } catch (error) {
        console.error('Erro ao buscar resultados:', error);
      }
    };

    fetchResults();
  }, []);

  return (
    <div className="results-page">
      <h1>Resultados</h1>
      {results.length === 0 ? (
        <p>Nenhum resultado encontrado.</p>
      ) : (
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
                <td>{new Date(result.date).toLocaleString('pt-BR')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

        <button 
            className="view-results-button" 
            onClick={() => navigate('/site-digitacao')}
          >
           Página incial
          </button>
    </div>
  );
}

export default Results;