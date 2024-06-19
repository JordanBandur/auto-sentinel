var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'auto.sentinelx@gmail.com',
    pass: 'yvbplodxrbqqvxzt'
  }
});

const sendEmail = async (to, subject, htmlContent, attachments = []) => {
  const mailOptions = {
    from: 'auto.sentinelx@gmail.com',
    to: to,
    subject: subject,
    html: htmlContent,
    attachments: attachments
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
  } catch (error) {
    console.log('Error sending email: ' + error);
  }
};

module.exports = sendEmail;