var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'auto.sentinelx@gmail.com',
    pass: 'yvbplodxrbqqvxzt'
  }
});

const sendEmail = async (to, subject, htmlContent, attachment) => {
  const mailOptions = {
    from: 'auto.sentinelx@gmail.com',
    to: to,
    subject: subject,
    html: htmlContent,
    attachments: [
      {
        filename: attachment.filename,
        content: attachment.content,
        contentType: attachment.contentType
      }
    ]
  };

  console.log('Mail options:', mailOptions);

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
  } catch (error) {
    console.log('Error sending email: ' + error);
  }
};

module.exports = sendEmail;