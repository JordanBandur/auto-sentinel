const express = require('express');
const router = express.Router();
const obdSpoofService = require('../services/obdSpoofService');

// Route to get maintenance recommendations based on OBD data
router.get('/maintenance-recommendations/:vehicleId', async (req, res) => {
  const { vehicleId } = req.params;
  try {
    const data = await obdSpoofService.getCurrentData(vehicleId);
    if (!data) {
      return res.status(404).json({ error: 'No OBD data available' });
    }

    const recommendations = [];

    if (data.coolantTemp && data.coolantTemp < 80) {
      recommendations.push('Coolant temperature is low. Please check your coolant level.');
    }
    if (data.rpm && data.rpm > 4000) {
      recommendations.push('High engine RPM detected. Please avoid excessive revving.');
    }
    if (data.batteryVoltage && data.batteryVoltage < 12) {
      recommendations.push('Low battery voltage detected. Please check your battery.');
    }
    if (data.engineLoad && data.engineLoad > 80) {
      recommendations.push('High engine load detected. Please check for any issues.');
    }

    res.json({ recommendations });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch maintenance recommendations', details: error });
  }
});

module.exports = router;