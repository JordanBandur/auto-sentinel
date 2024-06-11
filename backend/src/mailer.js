// src/mailer.js

const nodemailer = require('nodemailer');
const AWS = require('aws-sdk');

// configure AWS SDK with your SES credentials
AWS.config.update({
  accessKeyId: 'your_access_key_id',
  secretAccessKey: 'your_secret_access_key',
  region: 'your_region', // e.g., us-east-1
});

// create a transporter object using SES
const transporter = nodemailer.createTransport({
  SES: new AWS.SES({
    apiVersion: '2010-12-01',
  }),
});

const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: 'your_verified_email@example.com',
    to: to,
    subject: subject,
    text: text,
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
  } catch (error) {
    console.log('Error sending email: ' + error);
  }
};

module.exports = sendEmail;