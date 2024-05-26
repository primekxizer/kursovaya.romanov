// server.js
const express = require('express');
const path = require('path');
const session = require('express-session'); // Добавляем express-session
const sequelize = require('./config/database');
const app = express();

// Middleware для обработки JSON и URL-encoded данных
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Настройка express-session
app.use(session({
    secret: 'secret', // Секрет для подписи идентификатора сессии
    resave: false,
    saveUninitialized: false
}));

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
app.use('/register', require('./routes/register')); // Добавляем маршрут для регистрации
app.use('/login', require('./routes/login')); // Добавляем маршрут для входа

// Подключение к базе данных MySQL и выполнение миграций
sequelize.sync()
    .then(() => {
        console.log('Connected to MySQL');
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Connection error', err);
    });
