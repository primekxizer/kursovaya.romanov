module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.addColumn('CartItems', 'name', {
          type: Sequelize.STRING,
          allowNull: false,
      });
      await queryInterface.addColumn('CartItems', 'price', {
          type: Sequelize.FLOAT,
          allowNull: false,
      });
  },
  down: async (queryInterface, Sequelize) => {
      await queryInterface.removeColumn('CartItems', 'name');
      await queryInterface.removeColumn('CartItems', 'price');
  }
};
