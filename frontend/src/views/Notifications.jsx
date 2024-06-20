import { useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { useSnackbar } from 'notistack';
import '../assets/styles/views/Notifications.scss';  // Corrected import path

const Notifications = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const { enqueueSnackbar } = useSnackbar();

  const handleSendText = () => {
    axiosInstance.post('/notifications/send-text', {
      to: phoneNumber,
      body: 'This is a test message.'
    })
    .then(response => {
      enqueueSnackbar(response.data.message, { variant: 'success' });
    })
    .catch(error => {
      console.error('Error sending text message:', error);
      enqueueSnackbar('Failed to send text message', { variant: 'error' });
    });
  };

  return (
    <Container maxWidth="sm" className="notifications">
      <Typography variant="h4" gutterBottom>
        Send Text Report
      </Typography>
      <Box className="phone-input-container">
        <Typography variant="body1" className="phone-label">
          Phone Number
        </Typography>
        <TextField
          variant="outlined"
          fullWidth
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="phone-input"
          InputProps={{
            style: { backgroundColor: 'white' }
          }}
        />
      </Box>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSendText}
        className="send-button"
      >
        Send Text
      </Button>
    </Container>
  );
};

export default Notifications;