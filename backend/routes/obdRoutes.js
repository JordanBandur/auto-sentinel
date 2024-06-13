const express = require('express');
const { fetchObdData, saveObdSnapshot, checkObdConnection } = require('../controllers/obdController');

const router = express.Router();

router.get('/:vehicleId', fetchObdData);
router.get('/status/:vehicleId', checkObdConnection);
router.post('/snapshot', saveObdSnapshot);

module.exports = router;
