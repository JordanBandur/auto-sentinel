// controllers/obdController.js
const OBD = require('../models/OBD');
const { Sequelize } = require('sequelize');
const Op = Sequelize.Op;

const fetchObdData = async (req, res) => {
  try {
    const vehicleId = req.params.vehicleId;
    const obdData = await OBD.findOne({
      where: { vehicle_id: vehicleId },
      order: [['created_at', 'DESC']],
      attributes: ['id', 'data', 'vehicle_id', 'created_at'],
    });
    if (obdData) {
      res.json(obdData);
    } else {
      res.status(404).json({ error: 'No OBD data found for this vehicle.' });
    }
  } catch (error) {
    console.error('Error fetching OBD data:', error);
    res.status(500).json({ error: 'Error fetching OBD data' });
  }
};

const saveObdSnapshot = async (req, res) => {
  try {
    const { obdData } = req.body;
    const newObdData = await OBD.create({
      data: {
        speed: obdData.speed,
        engineLoad: obdData.engineLoad,
        coolantTemperature: obdData.coolantTemperature,
      },
      vehicle_id: obdData.vehicle_id,
    });
    res.status(201).json(newObdData);
  } catch (error) {
    console.error('Error saving OBD snapshot:', error);
    res.status(500).json({ error: 'Error saving OBD snapshot' });
  }
};


const checkObdConnection = async (req, res) => {
  try {
    const vehicleId = req.params.vehicleId;
    const obdData = await OBD.findOne({
      where: {
        vehicle_id: vehicleId,
        created_at: {
          [Op.gt]: new Date(Date.now() - 60000), // Check for data within the last minute
        },
      },
      attributes: ['id'],
    });

    if (obdData) {
      res.json({ status: 'connected' });
    } else {
      res.json({ status: 'disconnected' });
    }
  } catch (error) {
    console.error('Error checking OBD connection status:', error);
    res.status(500).json({ error: 'Error checking OBD connection status' });
  }
};

module.exports = { fetchObdData, saveObdSnapshot, checkObdConnection };
