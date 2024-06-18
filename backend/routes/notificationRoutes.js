const express = require('express');
const router = express.Router();
const sendTextMessage = require('../src/twilioService'); // Adjusted path based on your structure

router.post('/send-text', async (req, res) => {
  const { to, body } = req.body;
  
  try {
    const messageSid = await sendTextMessage(to, body);
    res.status(200).json({ message: `Message sent: ${messageSid}` });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send message', details: error });
  }
});

module.exports = router;