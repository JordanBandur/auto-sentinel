const express = require('express');
const router = express.Router();
const obdSpoofService = require('../services/obdSpoofService');
const OBD = require('../models/OBD');
const sendEmail = require('../src/mailer'); // Ensure the path to mailer is correct

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

const formatSnapshotData = (data) => {
  return Object.entries(data).map(([key, value]) => `<b>${key}</b>: ${value}`).join('<br>');
};

router.post('/snapshot', async (req, res) => {
  const { vehicleId, data } = req.body;
  try {
    const snapshot = await obdSpoofService.saveSnapshot(vehicleId, data);
    
    // Fetch the snapshot details from the database
    const snapshotDetails = await obdSpoofService.getSnapshotDetails(snapshot.id);
    const formattedData = formatSnapshotData(snapshotDetails.data);

    // List of recipients
    const recipients = ['miguelmasche@gmail.com', 'jhanicmusic@gmail.com'];

    // Send an email with the snapshot details to each recipient
    for (const recipient of recipients) {
      await sendEmail(
        recipient,
        'Snapshot Saved',
        `<h1 style="color: Black">Vehicle Maintenance Tracker</h1>
         <p>Snapshot details:</p>
         <p>${formattedData}</p>`
      );
    }

    res.json(snapshot);
  } catch (error) {
    res.status(500).json({ error: 'Failed to save snapshot and send email', details: error });
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