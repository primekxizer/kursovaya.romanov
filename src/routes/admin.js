const express = require('express');
const router = express.Router();


router.get('/dashboard', (req, res) => {
    res.render('admin/dashboard', { title: 'Admin Dashboard' });
});



router.get('/add', (req, res) => {
    res.render('add', { title: 'Add Product' });
});


router.get('/edit/:id', (req, res) => {
    const productId = req.params.id;

    res.render('edit', { title: 'Edit Product', productId });
});


router.get('/orders', (req, res) => {

    res.render('orders', { title: 'Orders' });
});

module.exports = router;
