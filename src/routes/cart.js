const express = require('express');
const router = express.Router();


// Предположим, что у вас есть массив объектов товаров
let cartItems = [];

// Маршрут для отображения страницы корзины
router.get('/', function(req, res) {
    res.render('cart', { cartItems: cartItems });
});

// Маршрут для добавления товара в корзину
router.post('/cart/add', function(req, res) {
    const { id, name, price } = req.body;
    // Проверяем, есть ли товар уже в корзине
    const existingItemIndex = cartItems.findIndex(item => item.id === id);
    if (existingItemIndex !== -1) {
        // Если товар уже есть в корзине, увеличиваем его количество
        cartItems[existingItemIndex].quantity += 1;
    } else {
        // Если товара нет в корзине, добавляем его
        cartItems.push({ id, name, price, quantity: 1 });
    }
    res.redirect('/cart');
});

// Маршрут для удаления товара из корзины
router.post('/cart/remove', function(req, res) {
    const { id } = req.body;
    // Фильтруем товары, оставляя только те, которые не соответствуют указанному id
    cartItems = cartItems.filter(item => item.id !== id);
    res.redirect('/cart');
});

module.exports = router;
