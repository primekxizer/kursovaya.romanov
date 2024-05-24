// routes/admin.js

const express = require('express');
const router = express.Router();

// Маршрут для отображения страницы администратора
router.get('/', function(req, res) {
    res.render('admin', { title: 'Панель администратора' });
});

// Маршрут для отображения формы добавления товара
router.get('/add', function(req, res) {
    res.render('add-product', { title: 'Добавить товар' });
});

// Маршрут для обработки добавления товара
router.post('/add', function(req, res) {
    // Логика добавления товара
});

// Маршрут для отображения формы редактирования товара
router.get('/edit/:id', function(req, res) {
    // Логика получения информации о товаре по его ID и передача в форму редактирования
});

// Маршрут для обработки редактирования товара
router.post('/edit/:id', function(req, res) {
    // Логика редактирования товара
});

// Маршрут для обработки удаления товара
router.post('/delete/:id', function(req, res) {
    // Логика удаления товара
});

module.exports = router;
