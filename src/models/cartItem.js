

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 
const Product = require('./Product'); 

class CartItem extends Model {}

CartItem.init({
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'CartItem',
    tableName: 'cartitems', 
});

CartItem.belongsTo(Product, { foreignKey: 'productId' });

module.exports = CartItem;
