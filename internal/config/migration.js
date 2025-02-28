const sequelize = require('./database');

const migration = async () => {
    try {
        await sequelize.sync({ force: true });
        console.log('📦 Banco sincronizado!');
    } catch (error) {
        console.error('Erro ao sincronizar banco:', error);
    } finally {
        await sequelize.close();
    }
};

migration();