const express = require('express');
const router = express.Router();

router.get('/products', (req, res) => {
    const products = [
        { id: 1, name: 'Товар 1', price: 100 },
        { id: 2, name: 'Товар 2', price: 200 },
        { id: 3, name: 'Товар 3', price: 300 }
    ];
    res.render('products', { title: 'Товары', products });
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
