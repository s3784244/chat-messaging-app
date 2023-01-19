const express = require('express');

const { signup, login } = require('../controllers/auth.js');

const router = express.Router();

// Send data from frontend to backend
// Only with post routes you can send payload
// We want a function thats gonna happen on each route, so we will create controllers
router.post('./signup', signup);
router.post('./login', login);

module.exports = router;