'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('types', { 
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        }, 
        recipe_type: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
      });
  },

  down: (queryInterface) => {
      return queryInterface.dropTable('types');
  }
};
