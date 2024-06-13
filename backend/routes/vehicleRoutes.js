const express = require('express');
const router = express.Router();
const Vehicle = require('../models/Vehicle');

// GET /api/vehicles - Get all vehicles for the logged-in user
router.get('/', async (req, res) => {
  try {
    const vehicles = await Vehicle.findAll();
    res.json(vehicles);
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
