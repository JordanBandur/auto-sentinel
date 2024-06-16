import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Button, Card, CardContent, CardActions, Grid, FormControl, InputLabel, Select, MenuItem, Box, Tabs, Tab, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { Info as InfoIcon } from '@mui/icons-material';
import { styled } from '@mui/system';
import { useSnackbar } from 'notistack';
import '../assets/styles/views/Dashboard.scss';

const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  padding: theme.spacing(2),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));

const metricDescriptions = {
  rpm: "Revolutions per minute (RPM) is the number of times the engine's crankshaft completes one full rotation per minute.",
  speed: "The current speed of the vehicle in miles per hour (mph).",
  fuelLevel: "The percentage of fuel remaining in the fuel tank.",
  throttlePosition: "The position of the throttle as a percentage.",
  intakeAirTemperature: "The temperature of the air entering the engine.",
  coolantTemp: "The temperature of the engine coolant.",
  batteryVoltage: "The voltage of the vehicle's battery.",
  engineLoad: "Represents the percentage of the engine's capacity being used.",
  fuelPressure: "Indicates the pressure of the fuel in the fuel rail, important for proper fuel injection.",
  shortTermFuelTrim: "Adjustments made by the engine control unit to the fuel mixture for optimal combustion.",
  longTermFuelTrim: "Long-term adjustments to the fuel mixture to correct any persistent deviations from the ideal mixture.",
  massAirFlowRate: "The amount of air entering the engine, critical for fuel management.",
  o2SensorVoltage: "Voltage output from the oxygen sensor, which helps in adjusting the air-fuel ratio.",
  timingAdvance: "Indicates how much the spark timing is advanced from the top dead center.",
  manifoldAbsolutePressure: "Measures the pressure within the intake manifold, important for engine load calculations.",
  absoluteThrottlePosition: "The actual position of the throttle plate in the throttle body.",
  controlModuleVoltage: "Voltage supplied to the vehicle's control modules, which should be consistent for proper function.",
  fuelRailPressure: "Pressure within the fuel rail, crucial for fuel injection accuracy.",
  egrCommanded: "The extent to which the Exhaust Gas Recirculation (EGR) valve is open.",
  egrError: "The difference between the commanded and actual EGR positions.",
  evaporativePurge: "Measures the purging of fuel vapors from the fuel tank into the intake manifold.",
  warmupsSinceDtcCleared: "The number of times the engine has been warmed up since the Diagnostic Trouble Codes were cleared.",
  distanceTraveledSinceDtcCleared: "The distance traveled by the vehicle since the Diagnostic Trouble Codes were cleared.",
  ambientAirTemperature: "The temperature of the air outside the vehicle.",
  engineOilTemperature: "The temperature of the engine oil, important for engine protection and performance.",
  fuelInjectionTiming: "The timing of the fuel injection in relation to the engine's crankshaft position.",
  engineFuelRate: "The rate at which fuel is being consumed by the engine."
};

const Dashboard = () => {
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [obdStatus, setObdStatus] = useState(false);
  const [obdData, setObdData] = useState(null);
  const [isAdvancedView, setIsAdvancedView] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [performanceData, setPerformanceData] = useState({
    accelerationData: [],
    quarterMileData: [],
    brakingData: []
  });
  const { enqueueSnackbar } = useSnackbar();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState(null);

  useEffect(() => {
    axios.get('/api/vehicles')
      .then(response => setVehicles(response.data))
      .catch(error => console.error('Error fetching vehicles:', error));

    // Ensure OBD is disconnected initially
    axios.post('/api/obd/disconnect')
      .then(() => setObdStatus(false))
      .catch(error => console.error('Error disconnecting OBD on mount:', error));

    const checkObdStatus = () => {
      axios.get('/api/obd/status')
        .then(response => setObdStatus(response.data.connected))
        .catch(error => console.error('Error fetching OBD status:', error));
    };

    const interval = setInterval(checkObdStatus, 5000);

    return () => clearInterval(interval);
  }, []);

  const connectObd = () => {
    axios.post('/api/obd/connect')
      .then(() => {
        setObdStatus(true);
        enqueueSnackbar('OBD-II connected successfully', { variant: 'success' });
      })
      .catch(error => {
        console.error('Error connecting OBD:', error);
        enqueueSnackbar('Failed to connect OBD-II', { variant: 'error' });
      });
  };

  const disconnectObd = () => {
    axios.post('/api/obd/disconnect')
      .then(() => {
        setObdStatus(false);
        enqueueSnackbar('OBD-II disconnected successfully', { variant: 'info' });
      })
      .catch(error => {
        console.error('Error disconnecting OBD:', error);
        enqueueSnackbar('Failed to disconnect OBD-II', { variant: 'error' });
      });
  };

  const saveSnapshot = () => {
    if (!obdData) {
      enqueueSnackbar('No OBD data to save', { variant: 'warning' });
      return;
    }

    if (!selectedVehicle) {
      enqueueSnackbar('No vehicle selected', { variant: 'warning' });
      return;
    }

    axios.post('/api/obd/snapshot', { vehicleId: selectedVehicle, data: obdData })
      .then(response => {
        enqueueSnackbar('Snapshot saved successfully', { variant: 'success' });
      })
      .catch(error => {
        console.error('Error saving snapshot:', error.response ? error.response.data : error.message);
        enqueueSnackbar('Error saving snapshot', { variant: 'error' });
      });
  };

  useEffect(() => {
    const fetchObdData = () => {
      if (obdStatus) {
        axios.get('/api/obd/data')
          .then(response => setObdData(response.data))
          .catch(error => console.error('Error fetching OBD data:', error));
      }
    };

    const interval = setInterval(fetchObdData, 1000);

    return () => clearInterval(interval);
  }, [obdStatus]);

  const generatePostDriveAnalysis = () => {
    axios.post('/api/obd/generatePerformanceData')
      .then(response => setPerformanceData(response.data))
      .catch(error => console.error('Error generating performance data:', error));
  };

  const handleVehicleChange = (event) => {
    setSelectedVehicle(event.target.value);
  };

  const toggleView = () => {
    setIsAdvancedView(!isAdvancedView);
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleOpenModal = (metric) => {
    setSelectedMetric(metric);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedMetric(null);
  };

  const simpleMetrics = ['rpm', 'speed', 'fuelLevel', 'throttlePosition', 'intakeAirTemperature', 'coolantTemp', 'batteryVoltage'];
  const advancedMetrics = [
    ...simpleMetrics,
    'engineLoad', 'fuelPressure', 'shortTermFuelTrim', 'longTermFuelTrim', 'massAirFlowRate', 'o2SensorVoltage', 'timingAdvance', 'manifoldAbsolutePressure',
    'absoluteThrottlePosition', 'controlModuleVoltage', 'fuelRailPressure', 'egrCommanded', 'egrError', 'evaporativePurge', 'warmupsSinceDtcCleared',
    'distanceTraveledSinceDtcCleared', 'ambientAirTemperature', 'engineOilTemperature', 'fuelInjectionTiming', 'engineFuelRate'
  ];

  const displayedMetrics = isAdvancedView ? advancedMetrics : simpleMetrics;

  const formatLabel = (label) => {
    return label.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
  };

  const getFormattedValue = (metric, value) => {
    const decimals = ['batteryVoltage', 'o2SensorVoltage', 'shortTermFuelTrim', 'longTermFuelTrim', 'massAirFlowRate', 'timingAdvance', 'controlModuleVoltage', 'egrError', 'fuelInjectionTiming', 'engineFuelRate'];
    return decimals.includes(metric) ? parseFloat(value).toFixed(2) : parseInt(value);
  };

  const getPerformanceMetrics = () => (
    performanceData && performanceData.accelerationData.length > 0 ? (
      <Grid container spacing={2} className="performance-data-container">
        <Grid item xs={12}>
          <Typography variant="h6" className="performance-data-title">Acceleration Data</Typography>
        </Grid>
        {performanceData.accelerationData.map((data, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card className="performance-data-card">
              <CardContent>
                <Typography variant="body2" className="performance-data-label">Time: {data.time}s</Typography>
                <Typography variant="h6" className="performance-data-value">Speed: {data.speed} mph</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
        <Grid item xs={12}>
          <Typography variant="h6" className="performance-data-title">Quarter Mile Data</Typography>
        </Grid>
        {performanceData.quarterMileData.map((data, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card className="performance-data-card">
              <CardContent>
                <Typography variant="body2" className="performance-data-label">Time: {data.time}s</Typography>
                <Typography variant="body2" className="performance-data-label">Speed: {data.speed} mph</Typography>
                <Typography variant="body2" className="performance-data-label">Distance: {data.distance} m</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
        <Grid item xs={12}>
          <Typography variant="h6" className="performance-data-title">Braking Data</Typography>
        </Grid>
        {performanceData.brakingData.map((data, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card className="performance-data-card">
              <CardContent>
                <Typography variant="body2" className="performance-data-label">Time: {data.time}s</Typography>
                <Typography variant="body2" className="performance-data-label">Speed: {data.speed} mph</Typography>
                <Typography variant="body2" className="performance-data-label">Distance: {data.distance} m</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    ) : (
      <Typography variant="body1">Loading performance data...</Typography>
    )
  );

  const getObdMetrics = () => (
    <Grid container spacing={2} className="obd-data-container">
      {displayedMetrics.map((metric) => (
        <Grid item xs={12} sm={6} md={4} key={metric}>
          <Card className="obd-data-card">
            <CardContent>
              <Typography variant="body2" className="obd-data-label">{formatLabel(metric)}</Typography>
              <Typography variant="h6" className="obd-data-value">{getFormattedValue(metric, obdData[metric])}</Typography>
              <IconButton className='obd-metric-info-button' onClick={() => handleOpenModal(metric)} aria-label={`info about ${metric}`}>
                <InfoIcon />
              </IconButton>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );

  return (
    <Container maxWidth="md" className="dashboard">
      <StyledTypography variant="h3" gutterBottom className="dashboard-title">Dashboard</StyledTypography>
      <StyledTypography variant="subtitle1" gutterBottom className="dashboard-subtitle">Welcome to Auto Sentinel</StyledTypography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <StyledCard variant="outlined" className="vehicle-card">
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
                  <Box mt={2} display="flex" justifyContent="center" id="obd-buttons">
                    <StyledButton variant="contained" onClick={connectObd} disabled={obdStatus} className="connect-button obd-button">Connect OBD</StyledButton>
                    <StyledButton variant="contained" onClick={disconnectObd} disabled={!obdStatus} className="disconnect-button obd-button" color="error">Disconnect OBD</StyledButton>
                  </Box>
                </Box>
              )}
            </CardContent>
          </StyledCard>
        </Grid>

        {selectedVehicle && (
          <Grid item xs={12} id="obd-section" sx={{ mb: 8 }}>
            <Tabs
              value={selectedTab}
              onChange={handleTabChange}
              aria-label="OBD and Performance Views"
              sx={{ mb: 2 }}
            >
              <Tab label="OBD View" />
              <Tab label="Performance View" />
            </Tabs>
            {selectedTab === 0 ? (
              <>
                <StyledTypography variant="h5" gutterBottom className="obd-title">OBD-II Sensor</StyledTypography>
                <StyledButton variant="contained" color="primary" onClick={toggleView} sx={{ ml: 0 }}>
                  {isAdvancedView ? 'Switch to Simple View' : 'Switch to Advanced View'}
                </StyledButton>
                <StyledCard variant="outlined" className="obd-card">
                  <CardContent>
                    {obdStatus ? (
                      <>
                        <StyledTypography variant="body1" sx={{ color: obdStatus ? 'green' : 'red' }}>
                          Status: {obdStatus ? 'Connected' : 'Disconnected'}
                        </StyledTypography>
                        {obdData && getObdMetrics()}
                      </>
                    ) : (
                      <Typography variant="body1">Please connect OBD</Typography>
                    )}
                  </CardContent>
                  {obdStatus && (
                    <CardActions className="obd-actions">
                      <Button size="small" onClick={saveSnapshot} className="snapshot-button">Save Snapshot</Button>
                    </CardActions>
                  )}
                </StyledCard>
              </>
            ) : (
              <>
                <StyledTypography variant="h5" gutterBottom className="performance-title">Performance Metrics</StyledTypography>
                <StyledButton variant="contained" onClick={generatePostDriveAnalysis} disabled={!obdStatus} id="generate-report-button">{obdStatus ? 'Generate Post-Drive Analysis' : 'Connect OBD'}</StyledButton>
                <StyledCard variant="outlined" className="performance-card">
                  <CardContent>
                    {performanceData.accelerationData.length > 0 ? (
                      getPerformanceMetrics()
                    ) : (
                      <Typography variant="body1">No performance data available. Please generate a report.</Typography>
                    )}
                  </CardContent>
                </StyledCard>
              </>
            )}
          </Grid>
        )}
      </Grid>

      <Dialog open={modalOpen} onClose={handleCloseModal}>
        <DialogTitle>{selectedMetric}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {metricDescriptions[selectedMetric]}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Dashboard;
