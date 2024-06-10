const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Routes
//const authRoutes = require('./routes/authRoutes');
//const vehicleRoutes = require('./routes/vehicleRoutes');
//const maintenanceRoutes = require('./routes/maintenanceRoutes');
//const notificationRoutes = require('./routes/notificationRoutes');
//const obdRoutes = require('./routes/obdRoutes');
//const serviceReminderRoutes = require('./routes/serviceReminderRoutes');

//app.use('/api/auth', authRoutes);
//app.use('/api/vehicles', vehicleRoutes);
//app.use('/api/maintenance', maintenanceRoutes);
//app.use('/api/notifications', notificationRoutes);
//app.use('/api/obd', obdRoutes);
//app.use('/api/service-reminders', serviceReminderRoutes);

module.exports = app;