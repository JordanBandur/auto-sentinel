import axiosInstance from './axiosInstance';

export const fetchVehicles = () => {
  return axiosInstance.get('/vehicles')
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching vehicles:', error);
      throw error;
    });
};

export const connectObd = () => {
  return axiosInstance.post('/obd/connect')
    .then(response => response.data)
    .catch(error => {
      console.error('Error connecting OBD:', error);
      throw error;
    });
};

export const disconnectObd = () => {
  return axiosInstance.post('/obd/disconnect')
    .then(response => response.data)
    .catch(error => {
      console.error('Error disconnecting OBD:', error);
      throw error;
    });
};

export const fetchObdStatus = () => {
  return axiosInstance.get('/obd/status')
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching OBD status:', error);
      throw error;
    });
};

export const fetchObdData = () => {
  return axiosInstance.get('/obd/data')
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching OBD data:', error);
      throw error;
    });
};

export const saveSnapshot = (vehicleId, data) => {
  return axiosInstance.post('/obd/snapshot', { vehicleId, data })
    .then(response => response.data)
    .catch(error => {
      console.error('Error saving snapshot:', error);
      throw error;
    });
};

export const fetchHistoryData = (vehicleId) => {
  return axiosInstance.get(`/obd/history/${vehicleId}`)
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching historical OBD data:', error);
      throw error;
    });
};

export const sendSnapshotEmail = (vehicleId, data, email) => {
  return axiosInstance.post('/obd/snapshot-email', { vehicleId, data, email })
    .then(response => response.data)
    .catch(error => {
      console.error('Error sending snapshot email:', error);
      throw error;
    });
};

export const sendSnapshotText = (vehicleId, data, phoneNumber) => {
  return axiosInstance.post('/obd/send-text', { vehicleId, data, phoneNumber })
    .then(response => response.data)
    .catch(error => {
      console.error('Error sending snapshot text:', error);
      throw error;
    });
};

export const deleteHistoryEntry = (id) => {
  return axiosInstance.delete(`/obd/history/${id}`)
    .then(response => response.data)
    .catch(error => {
      console.error('Error deleting OBD entry:', error);
      throw error;
    });
};

export const generatePerformanceData = () => {
  return axiosInstance.post('/obd/generatePerformanceData')
    .then(response => response.data)
    .catch(error => {
      console.error('Error generating performance data:', error);
      throw error;
    });
};
