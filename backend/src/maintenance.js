// src/maintenance.js
const express = require('express');
const router = express.Router();
const sendTextMessage = require('./twilioService');

// Dummy function to get OBD sensor data - replace this with actual implementation
const getOBDSensorData = () => {
  return {
    vehicle: 'Toyota Camry',
    mileage: 120000,
    oilChangeDue: true,
    tirePressure: '35 PSI'
  };
};

router.post('/send-reminder', async (req, res) => {
  const { phoneNumber } = req.body;
  const sensorData = getOBDSensorData();

  const message = `Maintenance Reminder:
  Vehicle: ${sensorData.vehicle}
  Mileage: ${sensorData.mileage} miles
  Oil Change Due: ${sensorData.oilChangeDue ? 'Yes' : 'No'}
  Tire Pressure: ${sensorData.tirePressure}`;

  try {
    await sendTextMessage(phoneNumber, message);
    res.status(200).send({ success: true, message: 'Reminder sent successfully!' });
  } catch (error) {
    res.status(500).send({ success: false, message: 'Failed to send reminder.', error });
  }
});

module.exports = router;