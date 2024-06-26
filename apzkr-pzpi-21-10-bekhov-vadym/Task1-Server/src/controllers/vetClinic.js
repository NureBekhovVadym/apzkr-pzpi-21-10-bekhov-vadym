// controllers/vetClinic.js
const VetClinic = require('../models/VetClinic');

// Контролер для додавання ветеринарної клініки
exports.registerClinic = (req, res) => {
    const { clinicName, email, phone, address, description } = req.body;
    const userId = req.user.id;

    if (!clinicName || !email || !phone || !address || !description) {
        return res.status(400).json({ message: "Усі поля повинні бути заповнені" });
    }

    const newClinic = new VetClinic({ userId, clinicName, email, phone, address, description });
    newClinic.save()
        .then(() => {
            res.status(201).json({ message: "Клініка успішно додана" });
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ message: "Помилка при збереженні клініки" });
        });
};

// Відображення всіх ветеринарних клінік, які належать користувачу
exports.getAllClinics = async (req, res) => {
    try {
        // Отримання ідентифікатора користувача з токену
        const userId = req.user.id;

        // Отримання списку клінік, які належать користувачу за його ідентифікатором
        const clinics = await VetClinic.find({ userId });

        res.status(200).json(clinics);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Помилка сервера при отриманні списку клінік' });
    }
};

// Відображення всіх ветеринарних клінік в базі даних
exports.getAllVetClinics = async (req, res) => {
    try {
        const clinics = await VetClinic.find();
        res.status(200).json(clinics);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Помилка сервера при отриманні списку клінік' });
    }
};
