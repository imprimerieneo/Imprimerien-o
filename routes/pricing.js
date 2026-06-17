/**
 * Pricing Routes
 */

const express = require('express');
const router = express.Router();

const pricing = {
  bw: { A4: 0.20, A5: 0.15, A6: 0.10 },
  color: { A4: 0.50, A5: 0.35, A6: 0.25 },
  business_cards: { 50: 15, 100: 25 },
  binding: { up_20: 4, up_50: 5, up_100: 6, up_150: 8 }
};

// Get all pricing
router.get('/', (req, res) => {
  res.json(pricing);
});

// Calculate pricing
router.post('/calculate', (req, res) => {
  const { items } = req.body;
  
  if (!items || items.length === 0) {
    return res.status(400).json({ error: 'Items required' });
  }
  
  let total = 0;
  const breakdown = [];
  
  items.forEach(item => {
    let price = 0;
    
    switch(item.type) {
      case 'bw':
        price = pricing.bw[item.size] * item.quantity;
        break;
      case 'color':
        price = pricing.color[item.size] * item.quantity;
        break;
      case 'business_cards':
        price = pricing.business_cards[item.quantity];
        break;
      default:
        price = 0;
    }
    
    total += price;
    breakdown.push({
      type: item.type,
      quantity: item.quantity,
      price: price.toFixed(2)
    });
  });
  
  const tax = total * 0.21;
  const finalTotal = total + tax;
  
  res.json({
    breakdown,
    subtotal: total.toFixed(2),
    tax: tax.toFixed(2),
    total: finalTotal.toFixed(2)
  });
});

module.exports = router;
