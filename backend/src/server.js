// backend/src/server.js

const express = require('express');
const cors = require('cors');
const path = require('path'); // Achar o caminho do banco

// --- 1. CONFIGURAÇÃO DO BANCO
const dbConfig = {
  client: 'sqlite3',
  connection: {
    // Cria o banco dentro de backend/src/database/database.sqlite
    filename: path.resolve(__dirname, 'database', 'database.sqlite')
  },
  useNullAsDefault: true
};

const knex = require('knex')(dbConfig);

// --- 2. DEFINIÇÃO DO OBSERVER ---
class NotificationService {
  update(data) {
    console.log(`\n🔔 [ALERTA]: O Orçamento '${data.budgetCategory}' atingiu ${data.percentage}% do limite!\n`);
  }
}

class BudgetSubject {
  constructor() { this.observers = []; }
  addObserver(observer) { this.observers.push(observer); }
  notify(data) { this.observers.forEach(obs => obs.update(data)); }
  
  checkLimit(budget, currentExpense, totalExpenses) {
    const total = totalExpenses + currentExpense;
    if (!budget || budget.limit_amount <= 0) return;
    const percentage = (total / budget.limit_amount) * 100;
    
    if (percentage >= 90) {
      this.notify({ budgetCategory: budget.category, percentage: percentage.toFixed(2) });
    }
  }
}

// Instancia o Observer
const budgetSubject = new BudgetSubject();
const notificationService = new NotificationService();
budgetSubject.addObserver(notificationService);

// --- 3. SERVIDOR E ROTAS ---
const app = express();
app.use(express.json());
app.use(cors());

// Rota de Teste
app.get('/', (req, res) => res.send('API Rodando (Sem knexfile)! 🚀'));

// Rendas
app.get('/incomes', async (req, res) => {
    try {
        const incomes = await knex('incomes').select('*');
        res.json(incomes);
    } catch (e) { res.json([]); } // Retorna vazio se der erro na tabela
});
app.post('/incomes', async (req, res) => {
    try { await knex('incomes').insert(req.body); res.status(201).send(); } catch(e) { res.status(500).send(e.message); }
});

// Orçamentos
app.get('/budgets', async (req, res) => {
    try {
        const budgets = await knex('budgets').select('*');
        res.json(budgets);
    } catch (e) { res.json([]); }
});
app.post('/budgets', async (req, res) => {
    try { await knex('budgets').insert(req.body); res.status(201).send(); } catch(e) { res.status(500).send(e.message); }
});

// Despesas
app.get('/expenses', async (req, res) => {
    try {
        const expenses = await knex('expenses')
            .join('budgets', 'expenses.budget_id', '=', 'budgets.id')
            .select('expenses.*', 'budgets.category as budget_category');
        res.json(expenses);
    } catch (e) { res.json([]); }
});

app.post('/expenses', async (req, res) => {
    try {
        const { description, amount, budget_id } = req.body;
        
        // Lógica do Observer
        const budget = await knex('budgets').where({ id: budget_id }).first();
        if (budget) {
            const sumResult = await knex('expenses').where({ budget_id }).sum('amount as total');
            const currentTotal = sumResult[0].total || 0;
            budgetSubject.checkLimit(budget, parseFloat(amount), currentTotal);
        }

        await knex('expenses').insert({ description, amount, budget_id });
        res.status(201).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.get('/reminders', async (req, res) => {
  try {
    const reminders = await knex('reminders').select('*');
    res.json(reminders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/reminders', async (req, res) => {
  try {
    const { title, amount, due_date } = req.body;
    await knex('reminders').insert({ title, amount, due_date });
    res.status(201).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- 4. DESPESAS (Expenses) ---
// Precisamos dessa rota para o teste de integração e para o Observer
app.post('/expenses', async (req, res) => {
  try {
    const { description, amount, budget_id } = req.body;
    
    // (Opcional: Lógica do Observer aqui se P3 fez)
    
    await knex('expenses').insert({ description, amount, budget_id });
    res.status(201).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/expenses', async (req, res) => {
  const expenses = await knex('expenses').select('*');
  res.json(expenses);
});

// --- INICIALIZAÇÃO DO SERVIDOR ---

// Só liga o servidor se o arquivo for executado diretamente (npm start)
// Se for teste (Jest), ele ignora esse bloco e não trava o terminal.
if (require.main === module) {
  const PORT = 3001;
  app.listen(PORT, () => {
    console.log(`------------------------------------------------`);
    console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
    console.log(`------------------------------------------------`);
  });
}

// Exporta o app para que os testes consigam usar
module.exports = app;