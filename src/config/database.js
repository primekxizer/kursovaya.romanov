// config/database.js
const { Sequelize } = require('sequelize');

// Настройка подключения к базе данных MySQL
const sequelize = new Sequelize('online_store', 'root', '19801985', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;
