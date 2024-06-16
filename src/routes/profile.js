const express = require('express');
const router = express.Router();
const Order = require('../models/Order');


router.get('/', async (req, res) => {

    if (!req.session.user) {
        return res.redirect('/login'); 
    }

    try {
        const user = req.session.user; 
        const orders = await Order.findAll({ where: { userId: user.id } });
        res.render('profile', { user, orders });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
