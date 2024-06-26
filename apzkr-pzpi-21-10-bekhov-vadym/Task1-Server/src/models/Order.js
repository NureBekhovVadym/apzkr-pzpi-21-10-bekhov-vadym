const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users', // Посилання на модель користувача
        required: true
    },
    deviceQuantity: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    comment: {
        type: String,
        required: false
    }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
