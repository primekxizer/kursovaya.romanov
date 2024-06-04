const { DataTypes } = require('./database');
const sequelize = require('../config/database');

const OtherModel = sequelize.define('OtherModel', {

});

module.exports = OtherModel;