const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();

// Middleware для обработки JSON и URL-encoded данных
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Установка директории для статических файлов
app.use(express.static(path.join(__dirname, '../public')));

// Настройка шаблонизатора EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Маршруты для индекса и пользователей
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

// Подключение маршрутов для личного кабинета и списка заказов
app.use(require('./routes/profile'));
app.use(require('./routes/orders')); // Добавлено подключение маршрутов для заказов


// Подключение к базе данных MongoDB
mongoose.connect('mongodb://localhost/online-store', {
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Connection error', err);
});

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
