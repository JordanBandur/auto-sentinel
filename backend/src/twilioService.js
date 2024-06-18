
const twilio = require('twilio');

// Hard code your Twilio credentials here
const accountSid = 'AC312714242f4b7432c28cef88e28e41e8';
const authToken = 'e92558016d656bcfba9ea957f9dac4f4';
const twilioPhoneNumber = '+19188563315';

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