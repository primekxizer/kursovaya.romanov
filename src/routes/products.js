
const express = require('express');
const router = express.Router();

// Маршрут для страницы товаров
router.get('/', (req, res) => {
    // получить данные о товарах из базы данных
    const products = [
        { id: 1, name: 'Товар 1', price: 100 },
        { id: 2, name: 'Товар 2', price: 200 },
        { id: 3, name: 'Товар 3', price: 300 }
    ];
    res.render('products', { products });
});

module.exports = router;
