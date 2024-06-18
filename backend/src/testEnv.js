// src/testEnv.js
const twilio = require('twilio');

// Hard code your Twilio credentials here
const accountSid = 'AC312714242f4b7432c28cef88e28e41e8';
const authToken = 'e92558016d656bcfba9ea957f9dac4f4';
const twilioPhoneNumber = '+19188563315';

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