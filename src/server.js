const express = require('express');
const path = require('path');
const session = require('express-session');
const sequelize = require('./config/database');
const Category = require('./models/Category');
const Subcategory = require('./models/Subcategory');
const Product = require('./models/Product');

const app = express();


app.use(express.static(path.join(__dirname, '../public')));

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

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.get('/admin/login', (req, res) => {
    res.render('login-admin');
});


app.post('/admin/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === 'admin') {
        req.session.admin = true;
        res.redirect('/admin/dashboard');
    } else {
        res.redirect('/admin/login');
    }
});



app.get('/admin/dashboard', (req, res) => {
    if (req.session.admin) {
        res.render('admin/dashboard');
    } else {
        res.redirect('/admin/login');
    }
});


app.get('/admin/manage-orders', (req, res) => {
    if (req.session.admin) {
        const orders = [];
        res.render('admin/manage-orders', { orders });
    } else {
        res.redirect('/admin/login');
    }
});


app.use('/categories', require('./routes/categories'));
app.use('/products', require('./routes/products'));


app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/profile', require('./routes/profile'));
app.use('/orders', require('./routes/orders'));
app.use('/cart', require('./routes/cart'));
app.use('/admin', require('./routes/admin'));
app.use('/register', require('./routes/register'));
app.use('/login', require('./routes/login'));


app.use((req, res, next) => {
    res.status(404).render('404', { title: 'Page Not Found' });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('500', { title: 'Server Error' });
});


sequelize.sync({ force: false })
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
