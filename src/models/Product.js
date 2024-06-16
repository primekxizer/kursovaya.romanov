

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    shortDescription: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    fullDescription: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    subcategory: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    characteristic1: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    characteristic2: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    characteristic3: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    availability: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    color: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    brand: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    collection: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    size: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    releaseYear: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    manufacturer: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    storage: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    signalType: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    tableName: 'products', 
});

module.exports = Product;
