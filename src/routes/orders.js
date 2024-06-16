const express = require('express');
const router = express.Router();


const orders = []



router.get('/', (req, res) => {
    res.render('orders', { orders: orders });
});

module.exports = router;
