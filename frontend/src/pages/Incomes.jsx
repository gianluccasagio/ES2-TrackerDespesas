import { useState, useEffect } from 'react';
import api from '../services/api';

function Incomes() {
  const [incomes, setIncomes] = useState([]);
  const [form, setForm] = useState({ description: '', amount: '', date: '' });

  // Buscar dados do Backend ao carregar a tela
  useEffect(() => {
    loadIncomes();
  }, []);

  async function loadIncomes() {
    const response = await api.get('/incomes');
    setIncomes(response.data);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    // Enviar para o Backend
    await api.post('/incomes', form);
    alert('Renda salva!');
    setForm({ description: '', amount: '', date: '' }); // Limpa form
    loadIncomes(); // Recarrega lista
  }

  return (
    <div>
      <h2>Minhas Rendas</h2>

      {/* Formulário de Cadastro */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input 
          placeholder="Descrição (ex: Salário)" 
          value={form.description}
          onChange={e => setForm({...form, description: e.target.value})}
        />
        <input 
          type="number" placeholder="Valor" 
          value={form.amount}
          onChange={e => setForm({...form, amount: e.target.value})}
        />
        <input 
          type="date" 
          value={form.date}
          onChange={e => setForm({...form, date: e.target.value})}
        />
        <button type="submit">Adicionar Renda</button>
      </form>

      {/* Lista de Rendas */}
      <ul>
        {incomes.map(income => (
          <li key={income.id}>
            {income.description} - R$ {income.amount} ({income.date})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Incomes;