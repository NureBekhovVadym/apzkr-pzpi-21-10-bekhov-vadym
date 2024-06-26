// routes/animals.js
const express = require('express');
const router = express.Router();
const passport = require('passport');
const animalsController = require('../controllers/animals');
const checkRole = require('../middleware/checkRole');

// Маршрут для додавання тварини з автентифікацією Passport та перевіркою ролі User
router.post('/add', passport.authenticate('jwt', { session: false }), checkRole(['User']), animalsController.addAnimal);

router.get('/all', passport.authenticate('jwt', { session: false }), animalsController.getAllAnimal);



module.exports = router;
