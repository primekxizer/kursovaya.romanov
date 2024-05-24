const express = require('express');
const router = express.Router();

// Пример списка заказов (заглушка)
const orders = [
    { id: 1, name: 'Заказ 1', amount: 100 },
    { id: 2, name: 'Заказ 2', amount: 200 },
    { id: 3, name: 'Заказ 3', amount: 300 }
];

// Маршрут для отображения списка заказов
router.get('/orders', (req, res) => {
    res.render('order', { orders: orders }); // Отображение шаблона order.ejs с передачей списка заказов
});

module.exports = router;
