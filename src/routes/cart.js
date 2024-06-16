const express = require('express');
const router = express.Router();
const CartItem = require('../models/cartItem');
const Product = require('../models/Product'); 
const { ensureAuthenticated } = require('../auth');
const { fetchCartItems } = require('../controllers/cartController'); 


router.get('/', ensureAuthenticated, async (req, res, next) => {
    try {
        const items = await fetchCartItems(req.session.user.id);
        res.render('cart', { title: 'Корзина', cartItems: items });
    } catch (error) {
        console.error('Error fetching cart items:', error);
        res.status(500).render('500', { title: 'Server Error' });
    }
});


router.post('/add', ensureAuthenticated, async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.session.user.id;


        const product = await Product.findByPk(productId);

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }


        let cartItem = await CartItem.findOne({ where: { userId, productId } });

        if (cartItem) {

            cartItem.quantity += parseInt(quantity);
            await cartItem.save();
        } else {

            cartItem = await CartItem.create({
                userId,
                productId,
                quantity,
                name: product.name, 
                price: product.price,
            });
        }

        res.status(200).json({ message: 'Product added to cart successfully' });
    } catch (error) {
        console.error('Error adding product to cart:', error);
        res.status(500).json({ error: 'Server error' });
    }
});


router.post('/remove', ensureAuthenticated, async (req, res) => {
    const { itemId } = req.body; 

    try {
        const cartItem = await CartItem.findOne({
            where: {
                id: itemId,
                userId: req.session.user.id, 
            }
        });

        if (!cartItem) {
            return res.status(404).json({ error: 'Item not found in the cart' });
        }

        await cartItem.destroy();

        res.json({ message: 'Product removed from cart successfully' });
    } catch (error) {
        console.error('Error removing product from cart:', error);
        res.status(500).json({ error: 'Error removing product from cart' });
    }
});


router.post('/checkout/process', ensureAuthenticated, async (req, res) => {
    const { email, pickup, address } = req.body;
    const userId = req.session.user.id;

    try {

        await CartItem.destroy({
            where: {
                userId,
            }
        });

        res.render('thankyou', { title: 'Спасибо за заказ!' }); 
    } catch (error) {
        console.error('Error processing order:', error);
        res.status(500).render('500', { title: 'Server Error' });
    }
});

module.exports = router;
