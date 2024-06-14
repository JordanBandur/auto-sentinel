import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Button, Card, CardContent, CardActions, Grid, FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';
import '../assets/styles/views/Dashboard.scss';

const Dashboard = () => {
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [obdStatus, setObdStatus] = useState(false);
  const [obdData, setObdData] = useState(null);

  useEffect(() => {
    // Fetch vehicles information
    axios.get('/api/vehicles')
      .then(response => setVehicles(response.data))
      .catch(error => console.error('Error fetching vehicles:', error));

    // Check OBD status
    const checkObdStatus = () => {
      axios.get('/api/obd/status')
        .then(response => setObdStatus(response.data.connected))
        .catch(error => console.error('Error fetching OBD status:', error));
    };

    checkObdStatus();
    const interval = setInterval(checkObdStatus, 5000); // Poll every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const connectObd = () => {
    axios.post('/api/obd/connect')
      .then(() => setObdStatus(true))
      .catch(error => console.error('Error connecting OBD:', error));
  };

  const disconnectObd = () => {
    axios.post('/api/obd/disconnect')
      .then(() => setObdStatus(false))
      .catch(error => console.error('Error disconnecting OBD:', error));
  };

  const saveSnapshot = () => {
    if (!obdData) {
      alert('No OBD data to save');
      return;
    }

    axios.post('/api/obd/snapshot', { vehicleId: selectedVehicle, data: obdData })
      .then(response => alert('Snapshot saved successfully'))
      .catch(error => console.error('Error saving snapshot:', error));
  };

  useEffect(() => {
    const fetchObdData = () => {
      if (obdStatus) {
        axios.get('/api/obd/data')
          .then(response => setObdData(response.data))
          .catch(error => console.error('Error fetching OBD data:', error));
      }
    };

    const interval = setInterval(fetchObdData, 1000); // Poll OBD data every second

    return () => clearInterval(interval);
  }, [obdStatus]);

  const handleVehicleChange = (event) => {
    setSelectedVehicle(event.target.value);
  };

  return (
    <Container maxWidth="md" className="dashboard">
      <Typography variant="h3" gutterBottom className="dashboard-title">Dashboard</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card variant="outlined" className="vehicle-card">
            <CardContent>
              <FormControl fullWidth variant="outlined" margin="normal">
                <InputLabel id="vehicle-select-label">Select Vehicle</InputLabel>
                <Select
                  labelId="vehicle-select-label"
                  id="vehicle-select"
                  value={selectedVehicle}
                  onChange={handleVehicleChange}
                  label="Select Vehicle"
                  className="vehicle-select"
                >
                  {vehicles.map(vehicle => (
                    <MenuItem key={vehicle.id} value={vehicle.id}>
                      {vehicle.make} {vehicle.model} ({vehicle.year}) - {vehicle.license_plate}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {selectedVehicle && (
                <Box mt={2}>
                  <Typography variant="h6">
                    {vehicles.find(vehicle => vehicle.id === selectedVehicle).make} {vehicles.find(vehicle => vehicle.id === selectedVehicle).model} ({vehicles.find(vehicle => vehicle.id === selectedVehicle).year})
                  </Typography>
                  <Typography variant="body2">
                    {vehicles.find(vehicle => vehicle.id === selectedVehicle).license_plate}
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} style={{ marginBottom: '3rem' }}>
          <Typography variant="h5" gutterBottom className="obd-title">OBD-II Sensor</Typography>
          <Card variant="outlined" className="obd-card">
            <CardContent>
              <Typography variant="body1" className="obd-status">Status: {obdStatus ? 'Connected' : 'Disconnected'}</Typography>
              {obdData && (
                <Grid container spacing={2} className="obd-data-container">
                  {Object.keys(obdData).map((key) => (
                    <Grid item xs={12} sm={6} md={4} key={key}>
                      <Card className="obd-data-card">
                        <CardContent>
                          <Typography variant="body2" className="obd-data-label">{key}</Typography>
                          <Typography variant="h6" className="obd-data-value">{obdData[key]}</Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              )}
            </CardContent>
            <CardActions className="obd-actions">
              <Button variant="contained" color="primary" onClick={connectObd} disabled={obdStatus} className="obd-button">Connect</Button>
              <Button variant="contained" color="secondary" onClick={disconnectObd} disabled={!obdStatus} className="obd-button">Disconnect</Button>
              <Button size="small" onClick={saveSnapshot} className="snapshot-button">Save Snapshot</Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
