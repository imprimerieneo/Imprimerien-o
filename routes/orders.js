/**
 * Orders Routes
 */

const express = require('express');
const router = express.Router();

const orders = [];
let orderIdCounter = 1000;

// Create order
router.post('/', (req, res) => {
  const { items, customer, delivery } = req.body;
  
  if (!items || items.length === 0) {
    return res.status(400).json({ error: 'Items required' });
  }
  
  const order = {
    id: `ORD-${orderIdCounter++}`,
    items,
    customer,
    delivery,
    status: 'pending',
    createdAt: new Date().toISOString(),
    total: items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  };
  
  orders.push(order);
  res.status(201).json(order);
});

// Get order by ID
router.get('/:id', (req, res) => {
  const order = orders.find(o => o.id === req.params.id);
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }
  res.json(order);
});

// Get all orders
router.get('/', (req, res) => {
  res.json(orders);
});

// Update order status
router.patch('/:id', (req, res) => {
  const order = orders.find(o => o.id === req.params.id);
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }
  
  if (req.body.status) {
    order.status = req.body.status;
    order.updatedAt = new Date().toISOString();
  }
  
  res.json(order);
});

// Cancel order
router.delete('/:id', (req, res) => {
  const index = orders.findIndex(o => o.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Order not found' });
  }
  
  const cancelled = orders.splice(index, 1)[0];
  res.json({ message: 'Order cancelled', order: cancelled });
});

module.exports = router;
