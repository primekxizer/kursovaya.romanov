

const express = require('express');
const router = express.Router();
const { fetchCartItems } = require('../controllers/cartController'); 
router.get('/', (req, res) => {
    res.render('index', { title: 'Главная страница' });
});

router.get('/register', (req, res) => {
    res.render('register', { title: 'Регистрация' });
});

router.get('/login', (req, res) => {
    res.render('login', { title: 'Вход' });
});

router.get('/cart', async (req, res) => {
    try {
        if (!req.session.user) {
            return res.redirect('/login');
        }

        const userId = req.session.user.id;
        console.log('Fetching cart items for userId:', userId); 

        const items = await fetchCartItems(userId);

        res.render('cart', { title: 'Корзина', cartItems: items }); 
    } catch (error) {
        console.error('Error fetching cart items:', error);
        res.status(500).render('500', { title: 'Server Error' });
    }
});

module.exports = router;
