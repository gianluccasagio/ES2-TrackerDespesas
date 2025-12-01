// backend/src/server.js


const express = require('express');
const cors = require('cors');
const knexfile = require('../knexfile');
const knex = require('knex')(knexfile.development);

const app = express();
app.use(express.json());
app.use(cors());

// --- ROTAS RÁPIDAS (Para P2 poder trabalhar) ---
// 1. ROTA DE TESTE
app.get('/', (req, res) => {
  res.send('API do Controle de Despesas está RODANDO! 🚀');
});
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
    const { description, amount, budget_id } = req.body;
    // AQUI ENTRARÁ O OBSERVER DEPOIS (Pessoa 3)
    await knex('expenses').insert({ description, amount, budget_id });
    res.status(201).send();
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));