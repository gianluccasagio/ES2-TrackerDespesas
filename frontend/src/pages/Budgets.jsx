import { useState, useEffect } from 'react';
import api from '../services/api';

function Budgets() {
  const [budgets, setBudgets] = useState([]);
  const [expenses, setExpenses] = useState([]); 
  const [form, setForm] = useState({ category: '', limit_amount: '' });

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const [budgetsRes, expensesRes] = await Promise.all([
        api.get('/budgets'),
        api.get('/expenses')
      ]);
      setBudgets(budgetsRes.data);
      setExpenses(expensesRes.data);
    } catch (error) {
      alert("Erro ao carregar dados");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.category || !form.limit_amount) return alert("Preencha tudo!");

    try {
      await api.post('/budgets', form);
      alert('Orçamento criado!');
      setForm({ category: '', limit_amount: '' });
      loadData();
    } catch (error) {
      alert("Erro ao criar orçamento");
    }
  }

  function getBudgetStatus(budget) {
    const totalSpent = expenses
      .filter(e => e.budget_id === budget.id)
      .reduce((acc, curr) => acc + parseFloat(curr.amount), 0);
    
    const percentage = (totalSpent / budget.limit_amount) * 100;

    let color = 'green';
    let message = 'Dentro do limite';
    let icon = '✅';

    if (percentage >= 100) {
      color = 'red';
      message = 'ESTOUROU O LIMITE!';
      icon = '🚨';
    } else if (percentage >= 90) {
      color = 'orange';
      message = 'Atenção: Limite próximo';
      icon = '⚠️';
    }

    return { totalSpent, color, message, icon, percentage };
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Gerenciar Orçamentos</h2>
      
      {/* CORREÇÃO AQUI: Adicionei "color: '#333'" para o texto ficar preto no fundo branco */}
      <form onSubmit={handleSubmit} style={{ 
        marginBottom: '20px', 
        padding: '15px', 
        border: '1px solid #ddd', 
        borderRadius: '8px', 
        background: '#f9f9f9',
        color: '#333' 
      }}>
        <h3>Novo Orçamento</h3>
        <div>
          <label>Categoria: </label>
          <input 
            type="text" 
            placeholder="Ex: Mercado"
            value={form.category}
            onChange={e => setForm({...form, category: e.target.value})}
            style={{ marginLeft: '10px', padding: '5px' }}
          />
        </div>
        <div style={{ marginTop: '10px' }}>
          <label>Limite (R$): </label>
          <input 
            type="number" 
            placeholder="Ex: 500.00"
            value={form.limit_amount}
            onChange={e => setForm({...form, limit_amount: e.target.value})}
            style={{ marginLeft: '10px', padding: '5px' }}
          />
        </div>
        <button type="submit" style={{ marginTop: '15px', padding: '8px 15px', cursor: 'pointer' }}>Salvar Orçamento</button>
      </form>

      <h3>Meus Orçamentos (Status)</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {budgets.map(budget => {
          const status = getBudgetStatus(budget);

          return (
            <li key={budget.id} style={{ 
              marginBottom: '15px', 
              padding: '15px', 
              border: `2px solid ${status.color}`,
              borderRadius: '8px',
              backgroundColor: '#fff',
              color: '#333', // Garante texto preto nos cards também
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <strong style={{ fontSize: '1.2em' }}>{budget.category}</strong>
                  <div style={{ marginTop: '5px', color: '#555' }}>
                    Limite: R$ {budget.limit_amount}
                  </div>
                  <div style={{ marginTop: '5px', fontWeight: 'bold' }}>
                    Gasto Atual: R$ {status.totalSpent.toFixed(2)}
                  </div>
                </div>

                <div style={{ textAlign: 'right', color: status.color }}>
                  <div style={{ fontSize: '2em' }}>{status.icon}</div>
                  <div style={{ fontWeight: 'bold' }}>{status.percentage.toFixed(0)}%</div>
                  <small>{status.message}</small>
                </div>
              </div>
              
              <div style={{ width: '100%', height: '10px', background: '#eee', marginTop: '10px', borderRadius: '5px' }}>
                <div style={{ 
                  width: `${Math.min(status.percentage, 100)}%`, 
                  height: '100%', 
                  background: status.color,
                  borderRadius: '5px',
                  transition: 'width 0.5s'
                }}></div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Budgets;