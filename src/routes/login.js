// routes/login.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Отображение страницы входа
router.get('/', (req, res) => {
    res.render('login');
});

// Обработка входа пользователя
router.post('/', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Поиск пользователя по email
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.render('login', { error: 'Неверный email или пароль.' });
        }

// Проверка пароля
const isMatch = await bcrypt.compare(password, user.password);
if (!isMatch) {
    return res.render('login', { error: 'Неверный email или пароль.' });
}


        // Сохранение данных пользователя в сессии
        req.session.user = {
            id: user.id,
            username: user.username,
            email: user.email
        };

        res.redirect('/profile');
    } catch (err) {
        res.render('login', { error: 'Ошибка сервера' });
    }
});

module.exports = router;
