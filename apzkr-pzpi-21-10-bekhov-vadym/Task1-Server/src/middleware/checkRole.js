// middleware/checkRole.js
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const User = require('../models/User');

module.exports = (roles) => {
    return async (req, res, next) => {
        try {
            const token = req.headers.authorization.split(' ')[1]; // Отримання токена з заголовка Authorization
            if (!token) {
                return res.status(401).json({ message: 'Необхідна автентифікація' });
            }

            const decoded = jwt.verify(token, keys.jwt);
            const user = await User.findById(decoded.userId);

            if (!user) {
                return res.status(404).json({ message: 'Користувача не знайдено' });
            }

            if (!roles.includes(user.role)) {
                return res.status(403).json({ message: 'У вас недостатньо прав для виконання цієї дії' });
            }

            req.user = user; // Додавання об'єкта користувача до запиту для подальшого використання
            next();
        } catch (error) {
            console.error(error);
            return res.status(401).json({ message: 'Необхідна автентифікація' });
        }
    };
};
