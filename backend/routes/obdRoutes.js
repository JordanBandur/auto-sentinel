const express = require('express');
const router = express.Router();
const obdSpoofService = require('../services/obdSpoofService');

router.get('/status', (req, res) => {
  res.json({ connected: obdSpoofService.getStatus() });
});

router.post('/connect', (req, res) => {
  obdSpoofService.connect();
  res.json({ message: 'OBD-II spoof connecting...' });
});

router.post('/disconnect', (req, res) => {
  obdSpoofService.disconnect();
  res.json({ message: 'OBD-II spoof disconnecting...' });
});

router.get('/data', (req, res) => {
  const data = obdSpoofService.getCurrentData();
  if (data) {
    res.json(data);
  } else {
    res.status(500).json({ error: 'No OBD data available' });
  }
});

router.post('/snapshot', async (req, res) => {
  const { vehicleId, data } = req.body;
  try {
    const snapshot = await obdSpoofService.saveSnapshot(vehicleId, data);
    res.json(snapshot);
  } catch (error) {
    res.status(500).json({ error: 'Failed to save snapshot' });
  }
});

// Route to generate performance data
router.post('/generatePerformanceData', (req, res) => {
  try {
    const performanceData = {
      accelerationData: obdSpoofService.generateAccelerationData(),
      quarterMileData: obdSpoofService.generateQuarterMileData(),
      brakingData: obdSpoofService.generateBrakingData(),
    };
    res.json(performanceData);
  } catch (error) {
    console.error('Error generating performance data:', error);
    res.status(500).json({ message: 'Error generating performance data' });
  }
});

module.exports = router;
