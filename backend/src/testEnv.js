// src/testEnv.js
const dotenv = require('dotenv');
const twilio = require('twilio');

// Load environment variables from .env file
dotenv.config({ path: '../.env' });

// Access Twilio credentials from environment variables
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

console.log('TWILIO_ACCOUNT_SID:', accountSid);
console.log('TWILIO_AUTH_TOKEN:', authToken);
console.log('TWILIO_PHONE_NUMBER:', twilioPhoneNumber);

const client = new twilio(accountSid, authToken);

const sendTestMessage = async () => {
  try {
    const message = await client.messages.create({
      body: 'This is a test message',
      from: twilioPhoneNumber,
      to: '+16478652040' // Replace with your phone number
    });
    console.log('Test message sent: ', message.sid);
  } catch (error) {
    console.log('Error sending test message: ', error);
  }
};

sendTestMessage();