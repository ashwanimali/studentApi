const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('studentdb', 'postgres', '1234', {
    host: 'localhost',
    dialect: 'postgres',
});

const authenticateDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');
        await sequelize.sync();
        console.log('All models were synchronized successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

module.exports = { sequelize, authenticateDB };
