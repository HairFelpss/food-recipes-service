'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('recipes', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
      },
      introduction: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      steps: {
        type: Sequelize.STRING(1000),
        allowNull: false,
      },
      ingredients: {
        type: Sequelize.STRING(1000),
        allowNull: false,
      },
      preparation_time: {
        type: Sequelize.STRING(20),
      },
      qt_yield: {
        type: Sequelize.STRING(20),
      },
      difficulty: {
        type: Sequelize.STRING(10),
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('recipes');
  }
};
