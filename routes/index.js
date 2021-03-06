const { Router } = require('express');
const router = Router();
const {signup, login, getUser} = require('../controllers/user.js'); 
const {setReservation, getAvailableTables, getReservations} = require('../controllers/reservation.js')
router.post('/setReservation', setReservation);
router.get('/getAvailableTables', getAvailableTables);
router.get('/getUser', getUser)
router.post('/signup', signup);
router.post('/login', login)
router.get('/getReservations', getReservations)
module.exports = router;