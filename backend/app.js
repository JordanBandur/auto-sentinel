const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const maintenanceRoutes = require('./src/maintenance');

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());


// Routes
const registerHandler = require('./routes/register');
const loginHandler = require('./routes/login');
//const authRoutes = require('./routes/authRoutes');
const vehicleRoutes = require('./routes/vehicleRoutes');
//const maintenanceRoutes = require('./routes/maintenanceRoutes');
//const notificationRoutes = require('./routes/notificationRoutes');
const obdRoutes = require('./routes/obdRoutes');
//const serviceReminderRoutes = require('./routes/serviceReminderRoutes');
//const dtcRoutes = require('./routes/dtcRoutes');
//const emailRoutes = require('./src/emailRoutes');
//const textRoutes = require('./src/textRoutes'); 

app.get('/', (req, res) => {
  res.send('Welcome to the Vehicle Maintenance Tracker API');
});

app.post('/register', registerHandler);
app.post('/login', loginHandler);
//app.use('/api/auth', authRoutes);
app.use('/api/vehicles', vehicleRoutes);
//app.use('/api/maintenance', maintenanceRoutes);
//app.use('/api/notifications', notificationRoutes);
app.use('/api/obd', obdRoutes);
//app.use('/api/service-reminders', serviceReminderRoutes);
//app.use('/api/email', emailRoutes);
//app.use('/api/text', textRoutes);
//app.use('/api/dtc', dtcRoutes);
app.use('/api/maintenance', maintenanceRoutes);

module.exports = app;