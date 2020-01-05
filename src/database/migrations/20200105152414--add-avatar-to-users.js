'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.addColumn(
        'users', 
        'avatar_id',
          { 
            type: Sequelize.INTEGER,
            references: { model: 'avatars', key: 'id' },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          });
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn('users', 'avatar_id')
  }
};
