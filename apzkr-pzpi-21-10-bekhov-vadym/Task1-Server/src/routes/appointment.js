// routes/appointment.js
const express = require('express');
const router = express.Router();
const passport = require('passport');
const appointmentController = require('../controllers/appointment');
const checkRole = require('../middleware/checkRole');

// Маршрут для додавання запису до ветеринарної клініки з автентифікацією Passport та перевіркою ролі User
router.post('/new', passport.authenticate('jwt', { session: false }), checkRole(['User']), appointmentController.addAppointment);

// Маршрут для отримання всіх записів з автентифікацією Passport та перевіркою ролі Admin
router.get('/all', passport.authenticate('jwt', { session: false }), checkRole(['Vet']), appointmentController.getAllAppointments);

module.exports = router;
