const express = require('express');
const router = express.Router();
const obdService = require('../services/obdSpoofService');

router.get('/status', (req, res) => {
  res.json({ connected: obdService.getStatus() });
});

router.post('/connect', (req, res) => {
  obdService.connect();
  res.json({ message: 'OBD-II spoof connecting...' });
});

router.post('/disconnect', (req, res) => {
  obdService.disconnect();
  res.json({ message: 'OBD-II spoof disconnecting...' });
});

router.get('/data', (req, res) => {
  const data = obdService.getCurrentData();
  if (data) {
    res.json(data);
  } else {
    res.status(500).json({ error: 'No OBD data available' });
  }
});

router.post('/snapshot', async (req, res) => {
  const { vehicleId, data } = req.body;
  try {
    const snapshot = await obdService.saveSnapshot(vehicleId, data);
    res.json(snapshot);
  } catch (error) {
    res.status(500).json({ error: 'Failed to save snapshot' });
  }
});

module.exports = router;
