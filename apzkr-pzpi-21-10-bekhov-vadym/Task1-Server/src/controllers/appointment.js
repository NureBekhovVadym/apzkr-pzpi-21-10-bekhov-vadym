const Appointment = require('../models/appointment');

// Контролер для додавання запису до ветеринарної клініки
exports.addAppointment = async (req, res) => {
    try {
        const { clinicId, animalId, date, time, description } = req.body;

        const userId = req.user.id;

        const newAppointment = new Appointment({
            userId,
            clinicId,
            animalId,
            date,
            time,
            description
        });

        await newAppointment.save();

        res.status(201).json({ message: 'Запис до ветеринарної клініки успішно створено', appointment: newAppointment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Помилка сервера при додаванні запису до ветеринарної клініки' });
    }
};

exports.getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find().populate('userId', 'name email').populate('animalId', 'name species');
        res.status(200).json(appointments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Помилка сервера при отриманні записів до ветеринарної клініки' });
    }
};