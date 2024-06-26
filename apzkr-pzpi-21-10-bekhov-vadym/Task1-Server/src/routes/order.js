const express = require('express');
const router = express.Router();
const passport = require('passport');
const orderController = require('../controllers/order');
const checkRole = require("../middleware/checkRole");
const appointmentController = require("../controllers/appointment");

router.post('/add', passport.authenticate('jwt', { session: false }), orderController.createOrder);
router.get('/all', passport.authenticate('jwt', { session: false }), checkRole(['Admin']), orderController.getAllOrders);


module.exports = router;
