import { useState, useEffect } from 'react';
import api from '../services/api';

function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [budgets, setBudgets] = useState([]); // Precisamos disso para o Select
  
  const [form, setForm] = useState({ 
    description: '', 
    amount: '', 
    budget_id: '' 
  });

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    // Carrega despesas E orçamentos
    const [expensesRes, budgetsRes] = await Promise.all([
      api.get('/expenses'),
      api.get('/budgets')
    ]);
    setExpenses(expensesRes.data);
    setBudgets(budgetsRes.data);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.budget_id) return alert("Selecione um orçamento!");

    try {
      await api.post('/expenses', form);
      alert('Despesa lançada!');
      setForm({ description: '', amount: '', budget_id: '' });
      loadData(); // Recarrega a lista
    } catch (error) {
      alert("Erro ao salvar despesa");
    }
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Lançar Despesas</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc' }}>
        <div style={{ marginBottom: '10px' }}>
          <label>Descrição: </label>
          <input 
            value={form.description}
            onChange={e => setForm({...form, description: e.target.value})}
            placeholder="Ex: Compras da semana"
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Valor (R$): </label>
          <input 
            type="number"
            value={form.amount}
            onChange={e => setForm({...form, amount: e.target.value})}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Vincular ao Orçamento: </label>
          <select 
            value={form.budget_id} 
            onChange={e => setForm({...form, budget_id: e.target.value})}
          >
            <option value="">Selecione...</option>
            {budgets.map(b => (
              <option key={b.id} value={b.id}>
                {b.category} (Limite: {b.limit_amount})
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Lançar Despesa</button>
      </form>

      <h3>Histórico de Gastos</h3>
      <ul>
        {expenses.map(expense => (
          <li key={expense.id}>
            {expense.description} - R$ {expense.amount} 
            <span style={{ color: 'gray', marginLeft: '10px' }}>
               (Orçamento: {expense.budget_category})
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Expenses;