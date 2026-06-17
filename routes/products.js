/**
 * Products Routes
 */

const express = require('express');
const router = express.Router();

const products = [
  {
    id: 'affiches',
    name: 'Affiches Publicitaires',
    description: 'Formats personnalisés pour tous vos besoins',
    price: 25,
    category: 'printing',
    image: 'https://picsum.photos/400/300?random=2'
  },
  {
    id: 'flyers',
    name: 'Flyers',
    description: 'Impression haute qualité sur papier premium',
    price: 15,
    category: 'printing',
    image: 'https://picsum.photos/400/300?random=3'
  },
  {
    id: 'cartes',
    name: 'Cartes de Visite',
    description: 'Cartes professionnelles personnalisées',
    price: 15,
    category: 'business',
    image: 'https://picsum.photos/400/300?random=4'
  },
  {
    id: 'brochures',
    name: 'Brochures',
    description: 'Brochures multipage avec reliure',
    price: 30,
    category: 'printing',
    image: 'https://picsum.photos/400/300?random=5'
  }
];

// Get all products
router.get('/', (req, res) => {
  res.json(products);
});

// Get product by ID
router.get('/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.json(product);
});

// Search products
router.get('/search', (req, res) => {
  const query = req.query.q?.toLowerCase();
  if (!query) {
    return res.status(400).json({ error: 'Search query required' });
  }
  
  const results = products.filter(p => 
    p.name.toLowerCase().includes(query) ||
    p.description.toLowerCase().includes(query)
  );
  
  res.json(results);
});

// Get featured products
router.get('/featured', (req, res) => {
  res.json(products.slice(0, 2));
});

module.exports = router;
