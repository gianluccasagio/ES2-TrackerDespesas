const request = require('supertest');
const app = require('../server'); // <--- MUDANÇA AQUI (era ../app)

describe('Testes do Servidor', () => {
    test('Deve responder na rota raiz', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).not.toBe(500); 
    });

    test('Deve retornar 404 para rota inexistente', async () => {
        const res = await request(app).get('/rota-que-nao-existe');
        expect(res.statusCode).toBe(404);
    });
});