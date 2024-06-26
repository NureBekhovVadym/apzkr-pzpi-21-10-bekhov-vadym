// routes/vetClinic.js
const express = require('express');
const router = express.Router();
const passport = require('passport');
const vetClinicController = require('../controllers/vetClinic');
const checkRole = require('../middleware/checkRole');

// Маршрут для додавання ветеринарної клініки з автентифікацією Passport та перевіркою ролі Vet
router.post('/add', passport.authenticate('jwt', { session: false }), checkRole(['Vet']), vetClinicController.registerClinic);

// Маршрут для перегляду всіх ветеринарних клінік, що належать користувачу з роллю Vet
router.get('/view', passport.authenticate('jwt', { session: false }), checkRole(['Vet']), vetClinicController.getAllClinics);

// Новий маршрут для перегляду всіх ветеринарних клінік в базі даних
router.get('/all',  vetClinicController.getAllVetClinics);

module.exports = router;
