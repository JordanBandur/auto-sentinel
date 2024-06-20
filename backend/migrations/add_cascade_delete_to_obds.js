'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Drop the existing foreign key constraint
    await queryInterface.removeConstraint('obds', 'obds_vehicle_id_fkey');

    // Add a new foreign key constraint with ON DELETE CASCADE
    await queryInterface.addConstraint('obds', {
      fields: ['vehicle_id'],
      type: 'foreign key',
      name: 'obds_vehicle_id_fkey',
      references: {
        table: 'vehicles',
        field: 'id',
      },
      onDelete: 'CASCADE',
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Drop the cascading delete constraint
    await queryInterface.removeConstraint('obds', 'obds_vehicle_id_fkey');

    // Add the original foreign key constraint without ON DELETE CASCADE
    await queryInterface.addConstraint('obds', {
      fields: ['vehicle_id'],
      type: 'foreign key',
      name: 'obds_vehicle_id_fkey',
      references: {
        table: 'vehicles',
        field: 'id',
      },
      onDelete: 'NO ACTION',
    });
  }
};
