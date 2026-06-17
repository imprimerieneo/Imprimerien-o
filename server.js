/**
 * ImprimeNéo - Express Server
 * ==========================
 */

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// ===== Middleware =====
app.use(helmet());
app.use(morgan('combined'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// ===== Routes =====
app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/pricing', require('./routes/pricing'));
app.use('/api/delivery', require('./routes/delivery'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/payment', require('./routes/payment'));

// ===== Health Check =====
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// ===== 404 Handler =====
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// ===== Error Handler =====
app.use((err, req, res, next) => {
  console.error('❌ Error:', err);
  res.status(500).json({ error: err.message || 'Internal Server Error' });
});

// ===== Start Server =====
app.listen(PORT, () => {
  console.log(`🚀 ImprimeNéo API running on http://localhost:${PORT}`);
  console.log(`📁 Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;
