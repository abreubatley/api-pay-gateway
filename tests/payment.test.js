const request = require('supertest');
const server = require('../server.js');
const { setupTestDatabase, teardownTestDatabase } = require('./testDatabase.js');
const { startMockServer, stopMockServer } = require("../mocks/mockserver.js");
const { prisma, setPrismaInstance} = require("../internal/prisma/prismaClient");

let prismas;

beforeAll(async () => {
    const { mockServerPort } = await startMockServer();
    process.env.MOCK_URL = `http://localhost:${mockServerPort}`;
    console.log(`test MOCK_URL defined in: ${process.env.MOCK_URL}`);

    const { prisma: testPrisma } = await setupTestDatabase();
    prismas = testPrisma
    setPrismaInstance(prismas);
    await prismas.$executeRaw`SELECT pg_terminate_backend(pg_stat_activity.pid)
                                  FROM pg_stat_activity
                                  WHERE pg_stat_activity.datname = current_database()
                                    AND pid <> pg_backend_pid();`;
    const tables = await prismas.$queryRaw`
        SELECT tablename FROM pg_tables WHERE schemaname='public';
    `;

    console.log("Tabelas existentes no banco:", tables);
});

beforeEach(async () => {
    await prismas.$executeRaw`CREATE TABLE IF NOT EXISTS public."Payment" (
        id SERIAL PRIMARY KEY,
        createdAt TIMESTAMPTZ DEFAULT NOW(),
        updatedAt TIMESTAMPTZ DEFAULT NOW(),
        paymentGatewayId TEXT UNIQUE NOT NULL,
        amount FLOAT,
        currency TEXT,
        method TEXT,
        status TEXT DEFAULT 'pending'
    );`;

    await prismas.payment.deleteMany({});
});

afterAll(async () => {
    await stopMockServer();
    await teardownTestDatabase();
});

describe('Payments API', () => {
    test('POST /payments make payment', async () => {
        const res = await request(server).post('/api/payments').send({
            amount: 100.1,
            currency: 'real',
            method: 'credit_card',
        });

        console.log(res.status, res.body);

        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body.status).toBe("pending");
    });

    test('GET /payments/:id get status payment', async () => {
        const payment = await prisma.payment.create({
            data: {
                paymentGatewayId: 'payment123',
                amount: 50,
                currency: 'USD',
                method: 'paypal',
            },
        });

        const paymentId = payment.id;
        const res = request(server).get(`/payments/${paymentId}`);

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('status', 'pending');
    });
});
