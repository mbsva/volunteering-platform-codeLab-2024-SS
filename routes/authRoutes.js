const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

console.log('Setting up auth routes...');

// Route for registration
router.post('/register', authController.register);

// Route for login
router.post('/login', authController.login);

// Route for fetching user info
router.get('/user', authController.authenticate, authController.getUser);

// New routes for updating and deleting user
router.put('/update', authController.authenticate, authController.updateUser);
router.delete('/delete/:id', authController.authenticate, authController.deleteUser);

module.exports = router;
