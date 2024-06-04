const express = require('express');
const router = express.Router();
const Category = require('../models/Category'); // Подключаем модель категорий

router.get('/products', async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.render('products', { title: 'Категории', categories });
    } catch (err) {
        console.error(err);
        res.status(500).send('Ошибка сервера');
    }
});

router.get('/', (req, res) => {
    res.render('index', { title: 'Главная страница', body: '' });
});

router.get('/register', (req, res) => {
    res.render('register', { title: 'Регистрация' });
});

router.get('/login', (req, res) => {
    res.render('login', { title: 'Вход' });
});

module.exports = router;
