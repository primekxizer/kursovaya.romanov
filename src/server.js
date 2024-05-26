
const express = require('express');
const path = require('path');
const session = require('express-session');
const sequelize = require('./config/database');
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));


app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});


app.use(express.static(path.join(__dirname, 'public')));


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/profile', require('./routes/profile'));
app.use('/orders', require('./routes/orders'));
app.use('/cart', require('./routes/cart'));
app.use('/admin', require('./routes/admin'));
app.use('/register', require('./routes/register'));
app.use('/login', require('./routes/login'));


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
