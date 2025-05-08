import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Results from './pages/Results';
import ResultsByUser from './pages/ResultsByUser';
import GlobalResults from './pages/GlobalResults';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

function App() {

  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserId(user ? user.uid : null);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/site-digitacao" element={<Home />} />
        <Route path="/results" element={<Results />} />
        {userId && (
        <Route path="/resultados/usuario" element={<ResultsByUser userId={userId} />} />
        )}
        <Route path="/resultados/globais" element={<GlobalResults />} />
      </Routes>
    </Router>
  );
}

export default App;
