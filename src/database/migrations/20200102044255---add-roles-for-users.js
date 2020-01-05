'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.addColumn(
        'users', 
        'role_id',
          { 
            type: Sequelize.INTEGER,
            references: { model: 'roles', key: 'id' },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          });
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn('users', 'role_id')
  }
};
