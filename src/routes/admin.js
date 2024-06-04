const express = require('express');
const router = express.Router();

// Маршрут для отображения панели администратора
router.get('/dashboard', (req, res) => {
    res.render('admin/dashboard', { title: 'Admin Dashboard' });
});


// Маршрут для добавления товара
router.get('/add', (req, res) => {
    res.render('add', { title: 'Add Product' });
});

// Маршрут для редактирования товара
router.get('/edit/:id', (req, res) => {
    const productId = req.params.id;

    res.render('edit', { title: 'Edit Product', productId });
});

// Маршрут для управления заказами
router.get('/orders', (req, res) => {

    res.render('orders', { title: 'Orders' });
});

module.exports = router;
