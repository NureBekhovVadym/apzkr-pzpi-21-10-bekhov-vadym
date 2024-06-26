const Order = require('../models/Order');
const User = require('../models/User'); // Імпорт моделі User

exports.createOrder = async (req, res) => {
    try {
        const { deviceQuantity, comment } = req.body;
        const userId = req.user.id;

        if (!deviceQuantity) {
            return res.status(400).json({ message: "Кількість пристроїв повинна бути вказана" });
        }

        const pricePerDevice = 2000;
        let discount = 0;

        if (deviceQuantity > 10) {
            discount = 0.10; // 10% знижка
        } else if (deviceQuantity > 3) {
            discount = 0.05; // 5% знижка
        }

        const totalPrice = deviceQuantity * pricePerDevice;
        const discountedPrice = totalPrice * (1 - discount);

        const newOrder = new Order({ userId, deviceQuantity, totalPrice: discountedPrice, date: new Date(), comment });
        await newOrder.save();

        res.status(201).json({ message: "Замовлення успішно створено", order: newOrder });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Помилка при створенні замовлення" });
    }
};

exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('userId', 'name email');
        res.status(200).json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Помилка сервера при отриманні замовлень' });
    }
};
