const { PostgreSqlContainer } = require('@testcontainers/postgresql');
const { setPrismaInstance } = require("../internal/prisma/prismaClient");
const { PrismaClient } = require("@prisma/client");

let container;
let testPrisma;

const setupTestDatabase = async () => {
    container = await new PostgreSqlContainer().start();
    const connectionUri = container.getConnectionUri();
    console.log("connectionUri retornado:", connectionUri);

    process.env.DATABASE_URL = connectionUri;
    const testPrisma = new PrismaClient();
    await testPrisma.$connect();

    setPrismaInstance(testPrisma);

    await testPrisma.$executeRaw`SELECT pg_terminate_backend(pg_stat_activity.pid)
                              FROM pg_stat_activity
                              WHERE pg_stat_activity.datname = current_database()
                                AND pid <> pg_backend_pid();`;

    return { container, prisma: testPrisma };
};

const teardownTestDatabase = async () => {
    if (testPrisma) {
        await testPrisma.$disconnect();
    }
    if (container) {
        await container.stop();
    }
};

module.exports = { setupTestDatabase, teardownTestDatabase };
