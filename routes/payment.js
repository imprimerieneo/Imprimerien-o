/**
 * Payment Routes
 */

const express = require('express');
const router = express.Router();

// Create payment intent
router.post('/intent', (req, res) => {
  const { amount, metadata } = req.body;
  
  if (!amount || amount <= 0) {
    return res.status(400).json({ error: 'Invalid amount' });
  }
  
  // TODO: Create Stripe payment intent
  res.json({
    clientSecret: `pi_${Date.now()}_secret`,
    amount: amount,
    currency: 'eur',
    status: 'requires_payment_method'
  });
});

// Confirm payment
router.post('/confirm', (req, res) => {
  const { paymentIntentId, paymentMethod } = req.body;
  
  if (!paymentIntentId) {
    return res.status(400).json({ error: 'Payment intent required' });
  }
  
  // TODO: Confirm payment with Stripe
  res.json({
    status: 'succeeded',
    paymentIntentId,
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
