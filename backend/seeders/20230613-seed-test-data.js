'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Insert a user
    const hashedPassword = await bcrypt.hash('password123', 10);
    const user = await queryInterface.bulkInsert('users', [{
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: hashedPassword,
      created_at: new Date(),
      updated_at: new Date()
    }], { returning: true });

    // Insert a vehicle
    const vehicle = await queryInterface.bulkInsert('vehicles', [{
      make: 'Toyota',
      model: 'Camry',
      year: 2020,
      vin: '1HGCM82633A123456',
      license_plate: 'ABC123',
      user_id: user[0].id,
      created_at: new Date(),
      updated_at: new Date()
    }], { returning: true });

    // Insert OBD data
    await queryInterface.bulkInsert('obds', [{
      data: JSON.stringify({
        speed: 60,
        engineLoad: 75,
        coolantTemperature: 90
      }),
      vehicle_id: vehicle[0].id,
      created_at: new Date(),
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('obds', null, {});
    await queryInterface.bulkDelete('vehicles', null, {});
    await queryInterface.bulkDelete('users', null, {});
  }
};
