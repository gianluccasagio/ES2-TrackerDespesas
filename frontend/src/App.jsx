import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Incomes from './pages/Incomes';

function App() {
  return (
    <BrowserRouter>
      <nav style={{ padding: '10px', background: '#eee' }}>
        <Link to="/">Home</Link> | <Link to="/incomes">Rendas</Link>
      </nav>

      <Routes>
        <Route path="/" element={<h1>Bem-vindo ao Controle de Despesas</h1>} />
        <Route path="/incomes" element={<Incomes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;