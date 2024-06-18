// src/twilioService.js
const dotenv = require('dotenv');
const twilio = require('twilio');

// Load environment variables from .env file
dotenv.config({ path: '../.env' });

// Access Twilio credentials from environment variables
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

const client = new twilio(accountSid, authToken);

const sendTextMessage = async (to, body) => {
  try {
    console.log(`Sending message to ${to} with body: ${body}`);
    const message = await client.messages.create({
      body: body,
      from: twilioPhoneNumber,
      to: to
    });
    console.log('Text message sent: ', message.sid);
    return message.sid;
  } catch (error) {
    console.log('Error sending text message: ', error);
    throw error; // Re-throw the error to be caught in the route handler
  }
};

module.exports = sendTextMessage;