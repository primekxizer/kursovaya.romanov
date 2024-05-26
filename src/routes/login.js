
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
        console.log('Полученные данные:', email, password); // Логирование входящих данных

        const user = await User.findOne({ where: { email } });
        if (!user) {
            console.log('Пользователь не найден'); // Логирование результата поиска
            return res.render('login', { error: 'Неверный email или пароль.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        console.log('Результат сравнения паролей:', isMatch);
        if (!isMatch) {
            console.log('Пароль не совпадает');
            return res.render('login', { error: 'Неверный email или пароль.' });
        }

        req.session.user = {
            id: user.id,
            username: user.username,
            email: user.email
        };

        res.redirect('/profile');
    } catch (err) {
        console.error('Ошибка сервера:', err.message);
        res.render('login', { error: 'Ошибка сервера' });
    }
});

module.exports = router;
