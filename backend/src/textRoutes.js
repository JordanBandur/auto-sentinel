const express = require('express');
const sendTextMessage = require('./twilioService');
const router = express.Router();

router.post('/send-text', async (req, res) => {
  const { to, body } = req.body;

  try {
    await sendTextMessage(to, body);
    res.status(200).send('Text message sent successfully');
  } catch (error) {
    res.status(500).send('Failed to send text message');
  }
});

module.exports = router;