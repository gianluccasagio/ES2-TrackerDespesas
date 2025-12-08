const express = require('express');
const app = express();
const PORT = 3001; // Porta da API

app.use(express.json());

// Rota de teste
app.get('/', (req, res) => {
  res.status(200).json({ message: 'API de Controle de Despesas no ar!' });
});

app.listen(PORT, () => {
  console.log(`Backend rodando na porta ${PORT}`);
});