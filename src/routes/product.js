const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    shortDescription: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fullDescription: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    subcategory: {
        type: DataTypes.STRING,
        allowNull: false
    },
    characteristic1: {
        type: DataTypes.STRING,
        allowNull: false
    },
    characteristic2: {
        type: DataTypes.STRING,
        allowNull: false
    },
    characteristic3: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Product;
