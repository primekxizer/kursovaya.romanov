const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Регистрация
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        let user = await User.findOne({ where: { email } });
        if (user) {
            return res.render('register', { error: 'Пользователь уже существует' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user = await User.create({ username, email, password: hashedPassword });

        const payload = { user: { id: user.id } };
        jwt.sign(payload, 'secret', { expiresIn: 360000 }, (err, token) => {
            if (err) throw err;
            res.redirect('/login');
        });
    } catch (err) {
        console.error(err.message);
        res.render('register', { error: 'Ошибка сервера' });
    }
});

// Авторизация
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.render('login', { error: 'Неверные учетные данные' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.render('login', { error: 'Неверные учетные данные' });
        }

        const payload = { user: { id: user.id } };
        jwt.sign(payload, 'secret', { expiresIn: 360000 }, (err, token) => {
            if (err) throw err;
            res.redirect('/profile');
        });
    } catch (err) {
        console.error(err.message);
        res.render('login', { error: 'Ошибка сервера' });
    }
});

module.exports = router;
