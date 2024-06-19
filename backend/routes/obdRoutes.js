const express = require('express');
const router = express.Router();
const obdSpoofService = require('../services/obdSpoofService');
const OBD = require('../models/OBD');
const sendEmail = require('../src/mailer');
const sendTextMessage = require('../src/twilioService');
const multer = require('multer');
const upload = multer();

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

const convertToCSV = (data) => {
  const headers = Object.keys(data);
  const csvRows = [headers.join(',')];

  const values = headers.map(header => {
    const escaped = ('' + data[header]).replace(/"/g, '\\"');
    return `"${escaped}"`;
  });
  csvRows.push(values.join(','));

  return csvRows.join('\n');
};

// Modified route to only save snapshot
router.post('/snapshot', async (req, res) => {
  const { vehicleId, data } = req.body;
  try {
    const snapshot = await obdSpoofService.saveSnapshot(vehicleId, data);
    res.json(snapshot);
  } catch (error) {
    res.status(500).json({ error: 'Failed to save snapshot', details: error });
  }
});

// New route to save snapshot and send email with CSV attachment
router.post('/snapshot-email', upload.none(), async (req, res) => {
  const { vehicleId, data, email } = req.body;
  const verifiedEmails = ['miguelmasche@gmail.com', 'rodriguezruizsergio@gmail.com', 'jordanbandur@hotmail.ca'];

  if (!verifiedEmails.includes(email)) {
    return res.status(400).json({ error: 'Please enter a verified email' });
  }

  try {
    const snapshot = await obdSpoofService.saveSnapshot(vehicleId, data);
    
    // Fetch the snapshot details from the database
    const snapshotDetails = await obdSpoofService.getSnapshotDetails(snapshot.id);
    const formattedData = formatSnapshotData(snapshotDetails.data);

    // Convert snapshot data to CSV
    const csvData = convertToCSV(snapshotDetails.data);
    const csvFileName = 'snapshot.csv';
    
    // Send an email with the snapshot details and CSV attachment
    await sendEmail(
      email,
      'Snapshot Saved with CSV',
      `<h1 style="color: Black">Vehicle Maintenance Tracker</h1>
       <p>Snapshot details:</p>
       <p>${formattedData}</p>`,
      [{ filename: csvFileName, content: csvData }]
    );

    res.json(snapshot);
  } catch (error) {
    res.status(500).json({ error: 'Failed to save snapshot and send email', details: error });
  }
});

router.post('/send-text', async (req, res) => {
  const { vehicleId, data, phoneNumber } = req.body;
  try {
    const snapshot = await obdSpoofService.saveSnapshot(vehicleId, data);
    
    // Fetch the snapshot details from the database
    const snapshotDetails = await obdSpoofService.getSnapshotDetails(snapshot.id);
    const snapshotData = Object.entries(snapshotDetails.data)
      .slice(0, 5) // Take only the first 5 entries
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

    await sendTextMessage(phoneNumber, snapshotData);

    res.json({ message: 'Snapshot saved and text message sent', snapshot });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save snapshot and send text message', details: error });
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