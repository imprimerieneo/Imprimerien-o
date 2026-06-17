/**
 * Contact Routes
 */

const express = require('express');
const router = express.Router();

// Send message
router.post('/message', (req, res) => {
  const { email, subject, message } = req.body;
  
  if (!email || !subject || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  // TODO: Send email via SMTP
  console.log('📧 New message:', { email, subject, message });
  
  res.json({
    success: true,
    message: 'Message sent successfully',
    timestamp: new Date().toISOString()
  });
});

// Get quote
router.post('/quote', (req, res) => {
  const { email, items, description } = req.body;
  
  if (!email || !items) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  // TODO: Generate and send quote
  console.log('📄 New quote request:', { email, items });
  
  res.json({
    success: true,
    message: 'Quote request received',
    quoteId: `QUOTE-${Date.now()}`,
    timestamp: new Date().toISOString()
  });
});

// Subscribe to newsletter
router.post('/subscribe', (req, res) => {
  const { email } = req.body;
  
  if (!email) {
    return res.status(400).json({ error: 'Email required' });
  }
  
  // TODO: Add to newsletter list
  console.log('📬 Newsletter subscription:', email);
  
  res.json({
    success: true,
    message: 'Subscribed successfully',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
