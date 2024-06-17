const AWS = require('aws-sdk');
const dotenv = require('dotenv');

// Enable AWS SDK debugging
process.env.AWS_SDK_LOAD_CONFIG = 1;
AWS.config.update({ region: process.env.AWS_REGION, logger: console });

dotenv.config();

const ses = new AWS.SES({ region: process.env.AWS_REGION });

const sendEmail = async (toEmail, subject, body) => {
  const params = {
    Destination: {
      ToAddresses: [toEmail],
    },
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: body,
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: subject,
      },
    },
    Source: process.env.SES_VERIFIED_EMAIL,
  };

  console.log('Sending email with params:', params);

  try {
    const result = await ses.sendEmail(params).promise();
    console.log('Email sent successfully:', result);
    return result;
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Error sending email');
  }
};

module.exports = { sendEmail };
