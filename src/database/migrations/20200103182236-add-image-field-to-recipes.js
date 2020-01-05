'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.addColumn(
        'recipes', 
        'photo_id',
          { 
            type: Sequelize.INTEGER,
            allowNull: false,
            references: { model: 'files', key: 'id' },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          });
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn('recipes', 'photo_id')
  }
};
