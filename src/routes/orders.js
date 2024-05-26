const express = require('express');
const router = express.Router();

// Пример списка заказов (заглушка)
const orders = []


// Маршрут для отображения списка заказов
router.get('/', (req, res) => {
    res.render('orders', { orders: orders });
});

module.exports = router;
