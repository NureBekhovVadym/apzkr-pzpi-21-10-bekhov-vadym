const Animal = require('../models/Animal');


// Контролер для додавання тварини
exports.addAnimal = (req, res) => {
    const { species, name } = req.body;
    const userId = req.user.id; // Отримання ідентифікатора користувача з токену JWT

    if (!species || !name) {
        return res.status(400).json({ message: "Усі поля повинні бути заповнені" });
    }

    const newAnimal = new Animal({ species, name, userId });
    newAnimal.save()
        .then(() => {
            res.status(201).json({ message: "Тварина успішно додана" });
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ message: "Помилка при збереженні тварини" });
        });
};
exports.getAllAnimal = async (req, res) => {
    try {
        // Отримання ідентифікатора користувача з токену
        const userId = req.user.id;

        // Отримання списку клінік, які належать користувачу за його ідентифікатором
        const clinics = await Animal.find({ userId });

        res.status(200).json(clinics);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Помилка сервера при отриманні списку клінік' });
    }
};