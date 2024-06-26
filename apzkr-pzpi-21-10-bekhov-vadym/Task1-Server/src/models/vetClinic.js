const mongoose = require('mongoose');

const clinicSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Посилання на модель користувача
        required: true
    },
    clinicName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

const vetClinic = mongoose.model('vetClinic', clinicSchema);

module.exports = vetClinic;