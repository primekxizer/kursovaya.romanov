const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
const ordersController = require('../controllers/ordersController');

// Страница админской панели
router.get('/dashboard', (req, res) => {
    res.render('admin/dashboard');
});

// Управление товарами
router.get('/products/add', productsController.showAddForm);
router.post('/products/add', productsController.addProduct);
router.get('/products/edit/:id', productsController.showEditForm);
router.post('/products/edit/:id', productsController.editProduct);
router.post('/products/delete/:id', productsController.deleteProduct);

// Управление заказами
router.get('/orders', ordersController.showOrders);
router.post('/orders/accept/:id', ordersController.acceptOrder);
router.post('/orders/reject/:id', ordersController.rejectOrder);
router.post('/orders/complete/:id', ordersController.completeOrder);

module.exports = router;
