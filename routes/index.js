const express = require('express');
const router = express.Router();
const offerController = require('../controllers/offerController');

// Home page route
router.get('/', (req, res) => {
    res.json({ message: 'Home Page' });
});
// Route for fetching all offers to display on the homepage
router.get('/homepage-offers', offerController.getAllOffers);
// Register page route
router.get('/register', (req, res) => {
    res.json({ message: 'Register Page' });
});

// Login page route
router.get('/login', (req, res) => {
    res.json({ message: 'Login Page' });
});

// Account page route
router.get('/account', (req, res) => {
    res.json({ message: 'Account Page' });
});

// Offers page route
router.get('/offers', (req, res) => {
    res.json({ message: 'Offers Page' });
});

module.exports = router;
