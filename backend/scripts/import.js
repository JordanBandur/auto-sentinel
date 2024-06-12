const fs = require('fs');
const { DTC, sequelize } = require('../models');

const importDTCData = async () => {
  try {
    console.log('Starting the data import process...');

    const data = fs.readFileSync('dtcData.json', 'utf8');
    const dtcData = JSON.parse(data);

    await sequelize.sync();

    for (const dtc of dtcData) {
      await DTC.upsert(dtc);
    }

    console.log('Data import completed successfully.');
  } catch (error) {
    console.error('Error importing data:', error);
  }
};

importDTCData();
