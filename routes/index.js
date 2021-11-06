const { Router } = require('express');
const router = Router();
const { signup } = require('../controllers/user.js'); 

router.post('/signup', signup);

module.exports = router;