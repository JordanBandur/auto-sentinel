const express = require('express');
const path = require('path');
const app = require('./app');
const dotenv = require('dotenv');
const { sequelize } = require('./models');

dotenv.config();

const PORT = process.env.PORT || 5000;

app.use((req, res) => {
  res.status(404).send('Page not found');
});

// Sync database and start server
sequelize.sync().then(() => {
  console.log('Connected to PostgreSQL');
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((error) => {
  console.error('Database connection error:', error);
});
