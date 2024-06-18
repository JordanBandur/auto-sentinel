const express = require('express');
const router = express.Router();
const obdSpoofService = require('../services/obdSpoofService');
const OBD = require('../models/OBD');

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

// Fetch historical OBD data for a specific vehicle
router.get('/history/:vehicleId', async (req, res) => {
  try {
    const { vehicleId } = req.params;
    const historyData = await OBD.findAll({
      where: { vehicle_id: vehicleId },
      order: [['created_at', 'DESC']]
    });

    // Parse the stored JSON data if necessary
    const parsedHistoryData = historyData.map(entry => ({
      ...entry.dataValues,
      data: entry.dataValues.data
    }));

    res.json(parsedHistoryData);
  } catch (error) {
    console.error('Error fetching historical OBD data:', error);
    res.status(500).send('Error fetching historical OBD data');
  }
});

// Delete an OBD entry
router.delete('/history/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const entry = await OBD.findByPk(id);
    if (entry) {
      await entry.destroy();
      res.json({ message: 'OBD entry deleted' });
    } else {
      res.status(404).json({ error: 'OBD entry not found' });
    }
  } catch (error) {
    console.error('Error deleting OBD entry:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;
