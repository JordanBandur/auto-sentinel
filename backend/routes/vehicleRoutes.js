const express = require('express');
const router = express.Router();
const Vehicle = require('../models/Vehicle');

console.log('Vehicle routes are being set up...');

// GET /api/vehicles - Get all vehicles for the logged-in user
router.get('/', async (req, res) => {
  console.log('GET /api/vehicles hit');
  try {
    const vehicles = await Vehicle.findAll({ where: { user_id: 1 } }); // Use userId: 1 for now
    res.json(vehicles);
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST /api/vehicles - Create a new vehicle
router.post('/', async (req, res) => {
  console.log('POST /api/vehicles hit');
  try {
    const { make, model, year, vin, license_plate } = req.body;
    const newVehicle = await Vehicle.create({ make, model, year, vin, license_plate, user_id: 1 });
    res.status(201).json(newVehicle);
  } catch (error) {
    console.error('Error creating vehicle:', error.message, error.stack);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// PUT /api/vehicles/:id - Update a vehicle
router.put('/:id', async (req, res) => {
  console.log('PUT /api/vehicles/:id hit');
  try {
    const { id } = req.params;
    const { make, model, year, vin, license_plate } = req.body;
    const vehicle = await Vehicle.findByPk(id);
    if (vehicle) {
      await vehicle.update({ make, model, year, vin, license_plate });
      res.json(vehicle);
    } else {
      res.status(404).json({ error: 'Vehicle not found' });
    }
  } catch (error) {
    console.error('Error updating vehicle:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE /api/vehicles/:id - Delete a vehicle
router.delete('/:id', async (req, res) => {
  console.log('DELETE /api/vehicles/:id hit');
  try {
    const { id } = req.params;
    const vehicle = await Vehicle.findByPk(id);
    if (vehicle) {
      await vehicle.destroy();
      res.json({ message: 'Vehicle deleted' });
    } else {
      res.status(404).json({ error: 'Vehicle not found' });
    }
  } catch (error) {
    console.error('Error deleting vehicle:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;