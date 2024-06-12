const express = require('express');
const router = express.Router();
const DTC = require('../models/DTC'); // Adjust the path if necessary

// GET /dtc/:code - Get DTC information by code
router.get('/:code', async (req, res) => {
  const dtcCode = req.params.code;
  try {
    const dtc = await DTC.findOne({ where: { code: dtcCode } });
    if (dtc) {
      res.json(dtc);
    } else {
      res.status(404).json({ error: 'DTC not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching DTC data' });
  }
});

module.exports = router;
