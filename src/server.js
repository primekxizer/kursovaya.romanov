

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('./config/database');
const User = require('./models/User'); 
const CartItem = require('./models/cartItem'); 

const usersRoutes = require('./routes/users');
const adminRoutes = require('./routes/admin');
const profileRoutes = require('./routes/profile');
const checkoutRoutes = require('./routes/checkout');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const sessionStore = new SequelizeStore({
    db: sequelize,
});

app.use(session({
    secret: 'your_secret_key',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000 
    }
}));


sessionStore.sync();


app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use('/users', usersRoutes);
app.use('/admin', adminRoutes);
app.use('/profile', profileRoutes);
app.use('/checkout', checkoutRoutes);
app.use('/register', require('./routes/register'));
app.use('/login', require('./routes/login'));
app.use('/products', require('./routes/products'));
app.use('/cart', require('./routes/cart'));
app.use('/orders', require('./routes/orders'));


app.get('/', (req, res) => {
    res.render('index', { title: 'Home' });
});


app.use((req, res) => {
    res.status(404).render('404', { title: 'Страница не найдена' });
});


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('500', { title: 'Ошибка сервера' });
});


sequelize.sync()
    .then(() => {
        console.log('Соединение с MySQL установлено');
        app.listen(PORT, () => {
            console.log(`Сервер запущен на порту ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Не удалось подключиться к базе данных:', err);
    });
