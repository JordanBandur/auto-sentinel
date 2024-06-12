
require('dotenv').config();
const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new twilio(accountSid, authToken);

const sendTextMessage = async (to, body) => {
  try {
    const message = await client.messages.create({
      body: body,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: to
    });
    console.log('Text message sent: ', message.sid);
  } catch (error) {
    console.log('Error sending text message: ', error);
  }
};

module.exports = sendTextMessage;