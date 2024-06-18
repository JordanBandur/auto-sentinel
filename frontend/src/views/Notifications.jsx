import React, { useState } from 'react';
import axiosInstance from "/Users/miguelaugusto/lighthouse/finalproject/auto-sentinel/frontend/src/utils/axiosInstance.js";
import { Container, TextField, Button, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';

const Notifications = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('This is a test message.');
  const { enqueueSnackbar } = useSnackbar();

  const handleSendText = () => {
    axiosInstance.post('/notifications/send-text', {
      to: phoneNumber,
      body: message
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
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Send Test Text Message
      </Typography>
      <TextField
        label="Phone Number"
        variant="outlined"
        fullWidth
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        margin="normal"
      />
      <TextField
        label="Message"
        variant="outlined"
        fullWidth
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSendText}
      >
        Send Text
      </Button>
    </Container>
  );
};

export default Notifications;