const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['User', 'Admin', 'Vet'],
        default: 'User' // За замовчуванням користувач має роль 'User'
    },
    registrationDate: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('users', userSchema);

module.exports = User;
