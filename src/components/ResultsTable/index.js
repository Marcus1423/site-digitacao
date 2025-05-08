import "./styles.css"

function ResultsTable({ data, title }) {
    return (
      <div className="results-page">
        <h1>{title}</h1>
        {data.length === 0 ? (
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
                {data.map(result => (
                  <tr key={result.id}>
                    <td>{result.correctCount}</td>
                    <td>{result.wpm}</td>
                    <td>{result.cpm}</td>
                    <td>{result.accuracy}</td>
                    <td>{result.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }
  
  export default ResultsTable;