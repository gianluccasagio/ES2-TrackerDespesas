// backend/src/server.js
const { NotificationService, BudgetSubject } = require('./patterns/BudgetObserver');

// Instancia o padrão
const budgetSubject = new BudgetSubject();
const notificationService = new NotificationService();
budgetSubject.addObserver(notificationService);

const express = require('express');
const cors = require('cors');
const knexfile = require('../knexfile');
const knex = require('knex')(knexfile.development);

const app = express();
app.use(express.json());
app.use(cors());

// --- ROTAS RÁPIDAS (Para P2 poder trabalhar) ---

// Renda
app.get('/incomes', async (req, res) => {
    const incomes = await knex('incomes').select('*');
    res.json(incomes);
});
app.post('/incomes', async (req, res) => {
    const { description, amount, date } = req.body;
    await knex('incomes').insert({ description, amount, date });
    res.status(201).send();
});

// Lembretes
app.get('/reminders', async (req, res) => {
    const reminders = await knex('reminders').select('*');
    res.json(reminders);
});
app.post('/reminders', async (req, res) => {
    const { title, amount, due_date } = req.body;
    await knex('reminders').insert({ title, amount, due_date });
    res.status(201).send();
});

// Orçamentos
app.get('/budgets', async (req, res) => {
    const budgets = await knex('budgets').select('*');
    res.json(budgets);
});
app.post('/budgets', async (req, res) => {
    const { category, limit_amount } = req.body;
    await knex('budgets').insert({ category, limit_amount });
    res.status(201).send();
});

// Despesas
app.post('/expenses', async (req, res) => {
  try {
    const { description, amount, budget_id } = req.body;

    // 1. Busca o Orçamento para saber o limite
    const budget = await knex('budgets').where({ id: budget_id }).first();

    // 2. Calcula quanto já gastou nesse orçamento (Soma bruta)
    const sumResult = await knex('expenses')
      .where({ budget_id })
      .sum('amount as total');
    const currentTotal = sumResult[0].total || 0;

    // 3. O Padrão Observer verifica se deve notificar
    budgetSubject.checkLimit(budget, parseFloat(amount), currentTotal);

    // 4. Salva a despesa
    await knex('expenses').insert({ description, amount, budget_id });
    res.status(201).send();
  } catch (error) {
    console.error(error); // Bom para debugar
    res.status(500).json({ error: error.message });
  }
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));