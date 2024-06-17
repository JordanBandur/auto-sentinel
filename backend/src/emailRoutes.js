const express = require('express');
const fs = require('fs');
const path = require('path');
const { sendEmail } = require('./emailService');
const { generateMockOBDReport } = require('./mockOBDReport');

const router = express.Router();

router.post('/send-report', async (req, res) => {
  console.log('Received request to send report');

  const emailsFilePath = path.join(__dirname, 'emails.json');
  console.log('Emails file path:', emailsFilePath);

  let emailAddresses;
  try {
    const data = fs.readFileSync(emailsFilePath, 'utf8');
    console.log('Raw email data:', data);

    const parsedData = JSON.parse(data);
    emailAddresses = parsedData.emails;
    console.log('Parsed email addresses:', emailAddresses);
  } catch (error) {
    console.error('Error reading email addresses:', error);
    return res.status(500).json({ error: 'Failed to read email addresses' });
  }

  const subject = 'Your Vehicle Health Report';
  const body = generateMockOBDReport();
  console.log('Email subject:', subject);
  console.log('Email body:', body);

  try {
    for (const email of emailAddresses) {
      console.log('Sending email to:', email);
      await sendEmail(email, subject, body);
      console.log('Email sent to:', email);
    }
    res.status(200).json({ message: 'Report sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send report' });
  }
});

module.exports = router;
