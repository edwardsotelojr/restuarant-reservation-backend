const { Router } = require('express');
const router = Router();
const {signup, login} = require('../controllers/user.js'); 
const {setReservation} = require('../controllers/reservation.js')
router.post('/setReservation', setReservation);
router.post('/signup', signup);
router.post('/login', login)
module.exports = router;