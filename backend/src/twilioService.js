// src/twilioService.js
const dotenv = require('dotenv');
const path = require('path');
const twilio = require('twilio');

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Access Twilio credentials from environment variables
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

if (!accountSid || !authToken || !twilioPhoneNumber) {
  console.error('Twilio configuration error: Ensure TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, and TWILIO_PHONE_NUMBER are set in .env file.');
  process.exit(1); // Exit the process with an error code
}

console.log('Twilio configuration loaded successfully.');

const client = new twilio(accountSid, authToken);

const sendTextMessage = async (to, snapshot) => {
  try {
    console.log('Received snapshot:', snapshot);

    let body;

    // Determine if snapshot is an actual snapshot object or a plain text message
    if (typeof snapshot === 'object' && snapshot !== null) {
      // Handle snapshot object
      const snapshotDetails = Object.entries(snapshot)
        .slice(0, 5) // Take only the first 5 entries
        .map(([key, value]) => `${key}: ${value}`) // Format each entry as key: value
        .join('\n'); // Join the entries with newlines
      
      body = `Vehicle Maintenance Tracker\n\nSnapshot details:\n\n${snapshotDetails}`;
    } else if (typeof snapshot === 'string') {
      // Handle plain text message
      body = snapshot;
    } else {
      throw new Error('Invalid snapshot format');
    }

    console.log(`Sending message to ${to} with body: ${body}`);
    const message = await client.messages.create({
      body: body,
      from: twilioPhoneNumber,
      to: to
    });
    console.log('Text message sent: ', message.sid);
    return message.sid;
  } catch (error) {
    console.error('Error sending text message: ', error);
    throw error; // Re-throw the error to be caught in the route handler
  }
};

module.exports = sendTextMessage;