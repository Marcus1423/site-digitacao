import './styles.css'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase'; // seu arquivo de configuração do Firebase
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { getUserId } from '../../utils/userId';

function Results() {
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const userId = getUserId(); // Pega o ID do usuário atual

        const resultsRef = collection(db, 'testResults');
        const q = query(
          resultsRef,
          where('userId', '==', userId),  // Filtra pelo userId
          orderBy('date', 'desc')         // Ordena pela data decrescente
        );

        const querySnapshot = await getDocs(q);
        const fetchedResults = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

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
                  <td>
                    {result.date?.toDate().toLocaleString('pt-BR', {
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