
const app = require('./app');
const dotenv = require('dotenv');
const { sequelize } = require('./models');
const express = require('express');
const DTC = require('./models/DTC');

dotenv.config();

console.log('Port from .env:', process.env.PORT);

const PORT = process.env.PORT || 5000;

app.get('/dtcs', async (req, res) => {
  try {
    const dtcs = await DTC.findAll();
    res.json(dtcs);
  } catch (error) {
    console.error('Error fetching DTCs:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

sequelize.sync().then(() => {
  console.log('Connected to PostgreSQL');
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((error) => {
  console.error('Database connection error:', error);
});