'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.addColumn(
        'recipes',
        'type_id', 
      { 
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'types', key: 'id' },
        onUpdate: 'CASCADE',
      });
  },

  down: (queryInterface) => {
      return queryInterface.removeColumn('recipes', 'type_id');
  }
};
