const express = require('express');
const router = express.Router();


let cartItems = [];

router.get('/', function(req, res) {
    res.render('cart', { cartItems: cartItems });
});

router.post('/cart/add', function(req, res) {
    const { id, name, price } = req.body;
    const existingItemIndex = cartItems.findIndex(item => item.id === id);
    if (existingItemIndex !== -1) {
        cartItems[existingItemIndex].quantity += 1;
    } else {
        cartItems.push({ id, name, price, quantity: 1 });
    }
    res.redirect('/cart');
});


router.post('/cart/remove', function(req, res) {
    const { id } = req.body;
    cartItems = cartItems.filter(item => item.id !== id);
    res.redirect('/cart');
});

module.exports = router;
