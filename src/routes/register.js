// routes/register.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Отображение страницы регистрации
router.get('/', (req, res) => {
    res.render('register');
});

// Обработка регистрации пользователя
router.post('/', async (req, res) => {
    const { username, email, password } = req.body;
    
    try {
        // Проверка наличия пользователя с таким же email
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).send('Пользователь с таким email уже существует.');
        }

        // Хэширование пароля
        const hashedPassword = await bcrypt.hash(password, 10);

        // Создание нового пользователя
        await User.create({
            username,
            email,
            password: hashedPassword
        });

        res.redirect('/login');
    } catch (err) {
        res.status(500).send('Ошибка сервера');
    }
});

module.exports = router;
