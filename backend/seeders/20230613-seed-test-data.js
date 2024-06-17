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
        rpm: 3000,
        speed: 60,
        fuelLevel: 50,
        throttlePosition: 30,
        intakeAirTemperature: 20,
        coolantTemperature: 90,
        batteryVoltage: 14,
        dtcs: 2,
        engineLoad: 40,
        fuelPressure: 50,
        shortTermFuelTrim: 5,
        longTermFuelTrim: 8,
        massAirFlowRate: 30,
        o2SensorVoltage: 0.8,
        timingAdvance: 15,
        manifoldAbsolutePressure: 100,
        absoluteThrottlePosition: 20,
        controlModuleVoltage: 3.5,
        fuelRailPressure: 200,
        egrCommanded: 50,
        egrError: 10,
        evaporativePurge: 30,
        warmupsSinceDtcCleared: 10,
        distanceTraveledSinceDtcCleared: 500,
        ambientAirTemperature: 25,
        engineOilTemperature: 100,
        fuelInjectionTiming: 10,
        engineFuelRate: 2
      }),
      vehicle_id: vehicle[0].id,
      created_at: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('obds', null, {});
    await queryInterface.bulkDelete('vehicles', null, {});
    await queryInterface.bulkDelete('users', null, {});
  }
};
