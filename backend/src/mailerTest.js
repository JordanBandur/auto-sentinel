const sendEmail = require('./mailer');

const testEmail = async (to, subject, text) => {
  try {
    await sendEmail(to, subject, text);
    console.log('Test email sent successfully');
  } catch (error) {
    console.error('Failed to send test email:', error);
  }
};

testEmail('miguelmasche@gmail.com', 'Test Subject', 'Test Text');