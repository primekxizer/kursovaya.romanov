const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Subcategory = require('./Subcategory');

const Product = sequelize.define('Product', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    subcategoryId: {
        type: DataTypes.INTEGER,
        references: {
            model: Subcategory,
            key: 'id'
        }
    }
}, {
    timestamps: false
});

Product.belongsTo(Subcategory, { foreignKey: 'subcategoryId', as: 'subcategory' });
Subcategory.hasMany(Product, { foreignKey: 'subcategoryId', as: 'products' });

module.exports = Product;
