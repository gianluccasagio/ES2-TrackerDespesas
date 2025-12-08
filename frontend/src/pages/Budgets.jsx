import { useState, useEffect } from 'react';
import api from '../services/api';

function Budgets() {
  const [budgets, setBudgets] = useState([]);
  const [form, setForm] = useState({ category: '', limit_amount: '' });

  useEffect(() => {
    loadBudgets();
  }, []);

  async function loadBudgets() {
    try {
      const response = await api.get('/budgets');
      setBudgets(response.data);
    } catch (error) {
      alert("Erro ao carregar orçamentos");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.category || !form.limit_amount) return alert("Preencha tudo!");

    try {
      await api.post('/budgets', form);
      alert('Orçamento criado!');
      setForm({ category: '', limit_amount: '' });
      loadBudgets();
    } catch (error) {
      alert("Erro ao criar orçamento");
    }
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Gerenciar Orçamentos</h2>
      
      {/* Formulário */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc' }}>
        <h3>Novo Orçamento</h3>
        <div>
          <label>Categoria: </label>
          <input 
            type="text" 
            placeholder="Ex: Mercado"
            value={form.category}
            onChange={e => setForm({...form, category: e.target.value})}
          />
        </div>
        <div style={{ marginTop: '10px' }}>
          <label>Limite (R$): </label>
          <input 
            type="number" 
            placeholder="Ex: 500.00"
            value={form.limit_amount}
            onChange={e => setForm({...form, limit_amount: e.target.value})}
          />
        </div>
        <button type="submit" style={{ marginTop: '10px' }}>Salvar Orçamento</button>
      </form>

      {/* Lista */}
      <h3>Meus Orçamentos</h3>
      <ul>
        {budgets.map(budget => (
          <li key={budget.id}>
            <strong>{budget.category}</strong> - Limite: R$ {budget.limit_amount}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Budgets;