const express = require('express');
const { signup, login } = require('../controllers/authController');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

router.get('/profile', (req, res) => {
  res.json({
    message: 'Welcome to your profile!',
  });
});

module.exports = router;
