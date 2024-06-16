// controllers/cartController.js

const CartItem = require('../models/cartItem'); 
const Product = require('../models/Product'); 


async function fetchCartItems(userId) {
    try {
        const cartItems = await CartItem.findAll({
            where: { userId },
            include: [{ model: Product, as: 'Product' }], 
        });

        console.log('SQL Query:', cartItems.toString());

        return cartItems;
    } catch (error) {
        throw new Error('Error fetching cart items from database: ' + error.message);
    }
}

module.exports = { fetchCartItems };
