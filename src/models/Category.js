const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Subcategory = require('./Subcategory');

const Category = sequelize.define('Category', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false
});

Category.hasMany(Subcategory, { as: 'Subcategories', foreignKey: 'categoryId' });
Subcategory.belongsTo(Category, { foreignKey: 'categoryId' });

module.exports = Category;
