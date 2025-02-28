const { PostgreSqlContainer } = require('@testcontainers/postgresql');
const sequelize = require('../internal/config/database.js');

let container;

const setupTestDatabase = async () => {
    container = await new PostgreSqlContainer().start();

    process.env.DB_HOST = container.getHost();
    process.env.DB_PORT = container.getPort();
    process.env.DB_USER = container.getUsername();
    process.env.DB_PASS = container.getPassword();
    process.env.DB_NAME = container.getDatabase();

    await sequelize.sync({ force: true });
};

const teardownTestDatabase = async () => {
    await sequelize.close();
    await container.stop();
};

module.exports = { setupTestDatabase, teardownTestDatabase };