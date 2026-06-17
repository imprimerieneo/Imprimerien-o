/**
 * Delivery Routes
 */

const express = require('express');
const router = express.Router();

const zones = [
  { id: 'BE', name: 'Belgique', cost: 5, days: 2 },
  { id: 'FR', name: 'France', cost: 8, days: 2 },
  { id: 'LU', name: 'Luxembourg', cost: 6, days: 2 }
];

// Get delivery zones
router.get('/zones', (req, res) => {
  res.json(zones);
});

// Estimate shipping
router.post('/estimate', (req, res) => {
  const { country, weight } = req.body;
  
  const zone = zones.find(z => z.id === country);
  if (!zone) {
    return res.status(400).json({ error: 'Invalid country' });
  }
  
  const cost = zone.cost + (weight > 5 ? (weight - 5) * 0.5 : 0);
  
  res.json({
    zone: zone.name,
    cost: cost.toFixed(2),
    days: zone.days
  });
});

// Get tracking
router.get('/tracking/:trackingNumber', (req, res) => {
  res.json({
    trackingNumber: req.params.trackingNumber,
    status: 'in_transit',
    lastUpdate: new Date().toISOString(),
    estimatedDelivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString()
  });
});

module.exports = router;
