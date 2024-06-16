'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Products', 'color', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('Products', 'brand', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('Products', 'collection', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('Products', 'size', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('Products', 'releaseYear', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
    await queryInterface.addColumn('Products', 'manufacturer', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('Products', 'storage', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
    await queryInterface.addColumn('Products', 'signalType', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Products', 'color');
    await queryInterface.removeColumn('Products', 'brand');
    await queryInterface.removeColumn('Products', 'collection');
    await queryInterface.removeColumn('Products', 'size');
    await queryInterface.removeColumn('Products', 'releaseYear');
    await queryInterface.removeColumn('Products', 'manufacturer');
    await queryInterface.removeColumn('Products', 'storage');
    await queryInterface.removeColumn('Products', 'signalType');
  }
};
