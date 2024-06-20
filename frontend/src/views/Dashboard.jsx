/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useContext } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { CardActions, Container, Tabs, Tab, Grid, Typography, Button, Dialog, DialogContent, DialogContentText, DialogTitle, TextField, DialogActions, CardContent } from '@mui/material';
import { useSnackbar } from 'notistack';
import '../assets/styles/views/Dashboard.scss';
import { MaintenanceContext } from '../context/MaintenanceContext';
import VehicleSelect from '../components/VehicleSelect';
import ObdMetrics from '../components/ObdMetrics';
import PerformanceMetrics from '../components/PerformanceMetrics';
import HistoryData from '../components/HistoryData';
import MaintenanceRecommendations from '../components/MaintenanceRecommendations';
import { StyledCard, StyledTypography, StyledButton, StyledDialog } from '../components/StyledComponents';
import { metricDescriptions, verifiedEmails, simpleMetrics, advancedMetrics } from '../constants';
import { formatLabel, getFormattedValue, convertToCSV, downloadCSV } from '../utils/utils';

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
  const [historyData, setHistoryData] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [modalOpen, setModalOpen] = useState(false);
  const [historyModalOpen, setHistoryModalOpen] = useState(false);
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState(null);
  const [selectedHistoryEntry, setSelectedHistoryEntry] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    axiosInstance.get('/vehicles')
      .then((response) => {
        console.log('Vehicles fetched:', response.data);
        setVehicles(response.data);
      })
      .catch((error) => console.error('Error fetching vehicles:', error));

    axiosInstance.post('/obd/disconnect')
      .then(() => setObdStatus(false))
      .catch((error) => console.error('Error disconnecting OBD on mount:', error));

    const checkObdStatus = () => {
      axiosInstance.get('/obd/status')
        .then((response) => {
          console.log('OBD status:', response.data);
          setObdStatus(response.data.connected);
        })
        .catch((error) => console.error('Error fetching OBD status:', error));
    };

    const interval = setInterval(checkObdStatus, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (selectedVehicle) {
      fetchHistoryData();
    }
  }, [selectedVehicle]);

  const fetchHistoryData = async () => {
    try {
      const response = await axiosInstance.get(`/obd/history/${selectedVehicle}`);
      setHistoryData(response.data);
    } catch (error) {
      console.error('Error fetching historical OBD data:', error);
    }
  };

  const connectObd = () => {
    axiosInstance.post('/obd/connect')
      .then(() => {
        setObdStatus(true);
        enqueueSnackbar('OBD-II connected successfully', { variant: 'success' });
      })
      .catch((error) => {
        console.error('Error connecting OBD:', error);
        enqueueSnackbar('Failed to connect OBD-II', { variant: 'error' });
      });
  };

  const disconnectObd = () => {
    axiosInstance.post('/obd/disconnect')
      .then(() => {
        setObdStatus(false);
        enqueueSnackbar('OBD-II disconnected successfully', { variant: 'info' });
      })
      .catch((error) => {
        console.error('Error disconnecting OBD:', error);
        enqueueSnackbar('Failed to disconnect OBD-II', { variant: 'error' });
      });
  };

  const { recommendations, setRecommendations } = useContext(MaintenanceContext);

  const generateRecommendations = (snapshotData) => {
    const recs = [];

    // Example recommendations based on snapshot data
    if (snapshotData.engineLoad > 80) {
      recs.push('Check engine load - high load detected.');
    }
    if (snapshotData.coolantTemp > 10) { // Lowered the threshold for testing
      recs.push('Check coolant temperature - overheating detected.');
    }
    if (snapshotData.batteryVoltage < 12) {
      recs.push('Check battery voltage - low voltage detected.');
    }

    setRecommendations(recs); // Set the recommendations in the context
    console.log('Recommendations generated:', recs); // Debug log
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

    axiosInstance.post('/obd/snapshot', { vehicleId: selectedVehicle, data: obdData })
      .then(() => {
        enqueueSnackbar('Snapshot saved successfully', { variant: 'success' });
        generateRecommendations(obdData); // Generate recommendations based on snapshot data
        fetchHistoryData(); // Fetch updated historical data
      })
      .catch((error) => {
        console.error('Error saving snapshot:', error.response ? error.response.data : error.message);
        enqueueSnackbar('Error saving snapshot', { variant: 'error' });
      });
  };

  // Function to send snapshot email
  const handleSendSnapshotEmail = (data) => {
    if (!verifiedEmails.includes(email)) {
      enqueueSnackbar('Please enter a verified email', { variant: 'warning' });
      return;
    }

    axiosInstance.post('/obd/snapshot-email', { vehicleId: selectedVehicle, data, email })
      .then(() => {
        enqueueSnackbar('Snapshot saved and email sent successfully', { variant: 'success' });
      })
      .catch((error) => {
        console.error('Error saving snapshot and sending email:', error.response ? error.response.data : error.message);
        enqueueSnackbar('Error saving snapshot and sending email', { variant: 'error' });
      });
  };

  // Function to send snapshot text
  const handleSendSnapshotText = (data) => {
    if (!phoneNumber) {
      enqueueSnackbar('No phone number entered', { variant: 'warning' });
      return;
    }

    axiosInstance.post('/obd/send-text', { vehicleId: selectedVehicle, data, phoneNumber })
      .then(() => {
        enqueueSnackbar('Snapshot saved successfully and text message sent', { variant: 'success' });
      })
      .catch((error) => {
        console.error('Error saving snapshot and sending text message:', error.response ? error.response.data : error.message);
        enqueueSnackbar('Error saving snapshot and sending text message', { variant: 'error' });
      });
  };

  useEffect(() => {
    const fetchObdData = () => {
      if (obdStatus) {
        axiosInstance.get('/obd/data')
          .then((response) => setObdData(response.data))
          .catch((error) => console.error('Error fetching OBD data:', error));
      }
    };

    const interval = setInterval(fetchObdData, 1000);

    return () => clearInterval(interval);
  }, [obdStatus]);

  const generatePostDriveAnalysis = () => {
    axiosInstance.post('/obd/generatePerformanceData')
      .then((response) => setPerformanceData(response.data))
      .catch((error) => console.error('Error generating performance data:', error));
  };

  const handleVehicleChange = (event) => {
    setSelectedVehicle(event.target.value);
  };

  const toggleView = () => {
    setIsAdvancedView(!isAdvancedView);
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
    if (newValue === 2) {
      fetchHistoryData();
    }
  };

  const handleOpenModal = (metric) => {
    setSelectedMetric(metric);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedMetric(null);
  };

  const handleOpenHistoryModal = (entry) => {
    setSelectedHistoryEntry(entry.data);
    setHistoryModalOpen(true);
  };

  const handleCloseHistoryModal = () => {
    setHistoryModalOpen(false);
    setSelectedHistoryEntry(null);
  };

  const handleOpenEmailModal = (entry) => {
    setSelectedHistoryEntry(entry.data);
    setEmailModalOpen(true);
  };

  const handleCloseEmailModal = () => {
    setEmailModalOpen(false);
    setSelectedHistoryEntry(null);
  };

  const handleDeleteHistoryEntry = async (id) => {
    try {
      await axiosInstance.delete(`/obd/history/${id}`);
      enqueueSnackbar('OBD entry deleted successfully', { variant: 'info' });
      fetchHistoryData();
    } catch (error) {
      console.error('Error deleting OBD entry:', error);
      enqueueSnackbar('Error deleting OBD entry', { variant: 'error' });
    }
  };

  const renderHistoryMetrics = () => (
    selectedHistoryEntry ? (
      <Grid container spacing={2} className="obd-data-container">
        {Object.keys(selectedHistoryEntry).map((metric) => (
          <Grid item xs={12} sm={6} md={4} key={metric}>
            <StyledCard className="obd-data-card">
              <CardContent>
                <Typography variant="body2" className="obd-data-label">{formatLabel(metric)}</Typography>
                <Typography variant="h6" className="obd-data-value">{getFormattedValue(metric, selectedHistoryEntry[metric])}</Typography>
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    ) : null
  );

  const displayedMetrics = isAdvancedView ? advancedMetrics : simpleMetrics;

  return (
    <Container maxWidth="md" className="dashboard">
      <StyledTypography variant="h3" gutterBottom className="dashboard-title">Dashboard</StyledTypography>
      <StyledTypography variant="subtitle1" gutterBottom className="dashboard-subtitle">Welcome to Auto Sentinel</StyledTypography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <VehicleSelect
            vehicles={vehicles}
            selectedVehicle={selectedVehicle}
            handleVehicleChange={handleVehicleChange}
            obdStatus={obdStatus}
            connectObd={connectObd}
            disconnectObd={disconnectObd}
          />
        </Grid>

        {selectedVehicle && (
          <Grid item xs={12} id="obd-section" sx={{ mb: 8 }}>
            <Tabs value={selectedTab} onChange={handleTabChange} aria-label="OBD and Performance Views" sx={{ mb: 2 }}>
              <Tab label="OBD View" />
              <Tab label="Performance View" />
              <Tab label="History" />
              <Tab label="Maintenance" /> {/* New Maintenance Tab */}
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
                        {obdData && (
                          <ObdMetrics
                            displayedMetrics={displayedMetrics}
                            obdData={obdData}
                            formatLabel={formatLabel}
                            getFormattedValue={getFormattedValue}
                            handleOpenModal={handleOpenModal}
                          />
                        )}
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
            ) : selectedTab === 1 ? (
              <>
                <StyledTypography variant="h5" gutterBottom className="performance-title">Performance Metrics</StyledTypography>
                <StyledButton variant="contained" onClick={generatePostDriveAnalysis} disabled={!obdStatus} id="generate-report-button">
                  {obdStatus ? 'Generate Post-Drive Analysis' : 'Connect OBD'}
                </StyledButton>
                <StyledCard variant="outlined" className="performance-card">
                  <CardContent>
                    {performanceData.accelerationData.length > 0 ? (
                      <PerformanceMetrics performanceData={performanceData} />
                    ) : (
                      <Typography variant="body1">No performance data available. Please generate a report.</Typography>
                    )}
                  </CardContent>
                </StyledCard>
              </>
            ) : selectedTab === 2 ? (
              <>
                <StyledTypography variant="h5" gutterBottom className="history-title">Historical OBD Data</StyledTypography>
                <StyledCard variant="outlined" className="history-card">
                  <CardContent>
                    {historyData.length > 0 ? (
                      <HistoryData
                        historyData={historyData}
                        formatLabel={formatLabel}
                        getFormattedValue={getFormattedValue}
                        handleOpenHistoryModal={handleOpenHistoryModal}
                        handleDeleteHistoryEntry={handleDeleteHistoryEntry}
                        handleOpenEmailModal={handleOpenEmailModal}
                        downloadCSV={downloadCSV}
                      />
                    ) : (
                      <Typography variant="body1">No historical data available.</Typography>
                    )}
                  </CardContent>
                </StyledCard>
              </>
            ) : selectedTab === 3 ? ( /* Maintenance tab */
              <>
                <StyledTypography variant="h5" gutterBottom className="maintenance-title">Maintenance</StyledTypography>
                <MaintenanceRecommendations recommendations={recommendations} />
              </>
            ) : null}
          </Grid>
        )}
      </Grid>

      <Dialog open={modalOpen} onClose={handleCloseModal}>
        <DialogTitle>{selectedMetric ? formatLabel(selectedMetric) : 'Metric Info'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {selectedMetric ? metricDescriptions[selectedMetric] : ''}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">Close</Button>
        </DialogActions>
      </Dialog>

      <StyledDialog open={historyModalOpen} onClose={handleCloseHistoryModal} maxWidth='md' fullWidth>
        <DialogTitle>Historical OBD Data</DialogTitle>
        <DialogContent>
          {selectedHistoryEntry ? (
            renderHistoryMetrics()
          ) : (
            <DialogContentText>No data available</DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseHistoryModal} color="primary">Close</Button>
        </DialogActions>
      </StyledDialog>

      <Dialog open={emailModalOpen} onClose={handleCloseEmailModal}>
        <DialogTitle>Email Snapshot</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter your phone number or email to send the snapshot.
          </DialogContentText>
          <TextField
            label="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            variant="outlined"
            margin="normal"
            fullWidth
          />
          <Button size="small" onClick={() => handleSendSnapshotText(selectedHistoryEntry)} className="snapshot-button">Send Snapshot via Text</Button>
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
            margin="normal"
            fullWidth
          />
          <Button size="small" onClick={() => handleSendSnapshotEmail(selectedHistoryEntry)} className="snapshot-button">Send Snapshot via Email</Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEmailModal} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Dashboard;
