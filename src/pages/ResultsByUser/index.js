import { useEffect, useState } from 'react';
import { getUserResults } from '../../services/resultsService';
import ResultsTable from '../../components/ResultsTable';

function ResultsByUser({ userId }) {
  const [results, setResults] = useState([]);

  useEffect(() => {
    getUserResults(userId).then(setResults);
  }, [userId]);

  return <ResultsTable data={results} title="Seus Resultados" />;
}

export default ResultsByUser;