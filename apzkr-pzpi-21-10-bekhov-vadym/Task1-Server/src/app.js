// src/app.js
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const keys = require('./config/keys');
const authRoutes = require('./routes/auth');
const animalRoutes = require('./routes/animals');
const vetClinicRoutes = require('./routes/vetClinic');
const appointmentRoutes = require('./routes/appointment');
const orderRoutes = require('./routes/order');

mongoose.connect(keys.mongoURI)
    .then(() => console.log('MongoDB connected'))
    .catch(error => console.log(error));

app.use(passport.initialize());
require('./middleware/paspport')(passport);

app.use(morgan('dev'));
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/animals', animalRoutes);
app.use('/api/vetClinic', vetClinicRoutes);
app.use('/api/appointment', appointmentRoutes);
app.use('/api/order', orderRoutes);

module.exports = app;
