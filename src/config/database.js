
const { Sequelize } = require('sequelize');


const sequelize = new Sequelize('online_shop', 'root', '19801985', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;
