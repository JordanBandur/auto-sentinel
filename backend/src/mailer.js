// src/mailer.js

require('dotenv').config();
const nodemailer = require('nodemailer');
const AWS = require('aws-sdk');

// Log environment variables for debugging
console.log('AWS_ACCESS_KEY_ID:', process.env.AWS_ACCESS_KEY_ID);
console.log('AWS_SECRET_ACCESS_KEY:', process.env.AWS_SECRET_ACCESS_KEY);
console.log('AWS_REGION:', process.env.AWS_REGION);
console.log('SES_VERIFIED_EMAIL:', process.env.SES_VERIFIED_EMAIL);

// Configure AWS SDK with your SES credentials
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// Create a transporter object using SES
const transporter = nodemailer.createTransport({
  SES: new AWS.SES({
    apiVersion: '2010-12-01',
  }),
});

const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: process.env.SES_VERIFIED_EMAIL,
    to: to,
    subject: subject,
    text: text,
  };

  // Logging for debugging
  console.log('Mail options:', mailOptions);

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
  } catch (error) {
    console.log('Error sending email: ' + error);
  }
};

module.exports = sendEmail;