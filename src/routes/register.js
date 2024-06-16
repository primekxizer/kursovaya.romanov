
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');


router.get('/', (req, res) => {
    res.render('register');
});


router.post('/', async (req, res) => {
    const { username, email, password } = req.body;

    try {

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.render('register', { error: 'Пользователь с таким email уже существует.' });
        }


        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('Хэшированный пароль:', hashedPassword); 


        await User.create({
            username,
            email,
            password: hashedPassword
        });

        res.redirect('/login');
    } catch (err) {
        console.error(err.message);
        res.render('register', { error: 'Ошибка сервера' });
    }
});

module.exports = router;
