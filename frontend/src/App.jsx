import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Incomes from './pages/Incomes';
// 1. IMPORTAR AS NOVAS PÁGINAS
import Budgets from './pages/Budgets';
import Expenses from './pages/Expenses';

function App() {
  return (
    <BrowserRouter>
      <nav style={{ padding: '15px', background: '#eee', marginBottom: '20px' }}>
        {/* 2. ADICIONAR OS LINKS NO MENU */}
        <Link to="/" style={{ marginRight: '10px' }}>Home</Link> | 
        <Link to="/incomes" style={{ margin: '0 10px' }}>Rendas</Link> |
        <Link to="/budgets" style={{ margin: '0 10px' }}>Orçamentos</Link> |
        <Link to="/expenses" style={{ margin: '0 10px' }}>Despesas</Link>
      </nav>
      
      <Routes>
        <Route path="/" element={<h1>Bem-vindo ao Controle de Despesas</h1>} />
        <Route path="/incomes" element={<Incomes />} />
        {/* 3. ADICIONAR AS ROTAS */}
        <Route path="/budgets" element={<Budgets />} />
        <Route path="/expenses" element={<Expenses />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;