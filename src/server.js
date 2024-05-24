const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();

// Middleware для обработки JSON и URL-encoded данных
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Установка директории для статических файлов
app.use(express.static(path.join(__dirname, 'public')));

// Настройка шаблонизатора EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Маршруты
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/profile', require('./routes/profile'));
app.use('/orders', require('./routes/orders')); // Путь для orders.js
app.use('/cart', require('./routes/cart'));
app.use('/admin', require('./routes/admin')); // Добавляем маршруты для администратора

// Подключение к базе данных MongoDB без устаревших параметров
mongoose.connect('mongodb://localhost/online-store')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('Connection error', err);
    });

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
