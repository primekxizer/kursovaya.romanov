

const express = require('express');
const router = express.Router();
const CartItem = require('../models/cartItem');
const Order = require('../models/Order');
const { ensureAuthenticated } = require('../auth');


router.get('/details', ensureAuthenticated, async (req, res) => {
    try {

        res.render('checkout', { title: 'Оформление заказа' });
    } catch (error) {
        console.error('Ошибка загрузки страницы оформления заказа:', error);
        res.status(500).render('500', { title: 'Ошибка сервера' });
    }
});


router.post('/process', ensureAuthenticated, async (req, res) => {
    const { email, name, phone, deliveryMethod, address } = req.body;
    const userId = req.session.user.id;

    try {

        const cartItems = await CartItem.findAll({ where: { userId } });


        let total = 0;
        const items = cartItems.map(item => {
            total += item.quantity * item.price; 
            return {
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                imageUrl: item.imageUrl, 
            };
        });


        await Order.create({
            userId,
            total,
            items,
            email,
            name,
            phone,
            deliveryMethod,
        });


        await CartItem.destroy({ where: { userId } });

  
        res.render('thankyou', { title: 'Спасибо за заказ!' });
    } catch (error) {
        console.error('Ошибка обработки заказа:', error);
        res.status(500).render('500', { title: 'Ошибка сервера' });
    }
});

module.exports = router;
