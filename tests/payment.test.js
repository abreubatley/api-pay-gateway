const request = require('supertest');
const app = require('../server.js');
const { setupTestDatabase, teardownTestDatabase } = require('./testDatabase.js');

beforeAll(async () => {
    await setupTestDatabase();
});

afterAll(async () => {
    await teardownTestDatabase();
});


describe('Payments API', () => {
    test('soma simples', () => {
        expect(1 + 1).toBe(2);
    });

    test('POST /payments deve criar um pagamento', async () => {
        const res = await request(app).post('/payments').send({
            amount: 100.1,
            currency: 'real',
            method: 'credit_card',
        });

        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body.status).toBe("pending");
    });

    test('GET /payments/:id deve retornar o status de um pagamento', async () => {
        const payment = await request(app).post('/payments').send({
            amount: 50,
            currency: 'USD',
            method: 'paypal',
        });

        const paymentId = payment.body.id;
        const res = await request(app).get(`/payments/${paymentId}`);

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('status', 'pending');
    });
});