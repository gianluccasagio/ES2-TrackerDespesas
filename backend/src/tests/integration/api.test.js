const request = require('supertest');

// ATENÇÃO: O servidor precisa estar rodando na porta 3001
const baseUrl = 'http://localhost:3001'; 

describe('Integration Test: API Routes', () => {
  test('GET /incomes deve retornar lista (Status 200)', async () => {
    // Tenta acessar a rota de receitas
    const response = await request(baseUrl).get('/incomes');
    
    // Se der erro aqui, é porque o servidor não está ligado!
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('POST /budgets deve criar um orçamento', async () => {
    // Tenta criar um orçamento
    const response = await request(baseUrl).post('/budgets').send({
      category: 'Integration Test',
      limit_amount: 5000
    });
    // Espera que crie com sucesso (201)
    expect(response.status).toBe(201);
  });
});