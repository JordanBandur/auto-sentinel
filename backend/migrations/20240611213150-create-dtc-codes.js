'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('dtc_codes', {
      code: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      symptoms: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      causes: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      diagnostic: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('dtc_codes');
  }
};
