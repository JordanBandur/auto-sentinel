var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'auto.sentinelx@gmail.com',
    pass: 'yvbplodxrbqqvxzt'
  }
});

const sendEmail = async (to, subject, htmlContent) => {
  const mailOptions = {
    from: 'auto.sentinelx@gmail.com',
    to: to,
    subject: subject,
    html: htmlContent // Use the dynamic HTML content here
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