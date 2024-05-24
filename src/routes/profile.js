const express = require('express');
const router = express.Router();

// Маршрут для отображения личного кабинета
router.get('/', function(req, res) {
    res.render('profile', { username: 'Имя пользователя' });
});

// Маршрут для отображения списка заказов
router.get('/orders', function(req, res) {
    // Здесь можно добавить логику для получения списка заказов из базы данных
    const orders = []; // Здесь должен быть ваш список заказов
    res.render('orders', { orders: orders });
});

module.exports = router;
