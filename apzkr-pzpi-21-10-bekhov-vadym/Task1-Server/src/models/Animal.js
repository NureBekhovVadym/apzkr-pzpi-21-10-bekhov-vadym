const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
    species: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Посилання на модель користувача
        required: true
    }
});

const Animal = mongoose.model('Animal', animalSchema);

module.exports = Animal;
