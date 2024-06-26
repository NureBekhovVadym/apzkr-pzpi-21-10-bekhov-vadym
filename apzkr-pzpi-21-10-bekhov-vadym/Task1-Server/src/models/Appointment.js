const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users', // Посилання на модель користувача
        required: true
    },
    clinicId: {
        type: String,
        required: true
    },
    animalId: {
        type: String,
        required: true
    },
    date: {
        type: Date
    },
    time: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

const appointment = mongoose.model('appointment', appointmentSchema);

module.exports = appointment;
