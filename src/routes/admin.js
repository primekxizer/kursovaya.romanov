const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Product = require('../models/Product');
const Order = require('../models/Order');
const Category = require('../models/Category');
const Subcategory = require('../models/Subcategory'); 


function isAdmin(req, res, next) {
    if (req.session.user && req.session.user.isAdmin) {
        next();
    } else {
        res.redirect('/login');
    }
}


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/products'); 
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); 
    }
});

const upload = multer({ storage });


router.get('/', isAdmin, (req, res) => {
    res.render('admin');
});


router.get('/products', isAdmin, async (req, res) => {
    try {
        const products = await Product.findAll(); 
        const categories = await Category.findAll({ include: 'Subcategories' });

        res.render('admin/products', { 
            title: 'Управление товарами', 
            products,
            categories
        });
    } catch (error) {
        console.error('Error fetching products or categories:', error);
        res.status(500).render('500', { title: 'Server Error' });
    }
});

router.get('/products/add', isAdmin, async (req, res) => {
    try {
        const categories = await Category.findAll({ include: 'Subcategories' }); 

        const subcategories = categories.reduce((acc, category) => {
            return acc.concat(category.Subcategories.map(sub => sub.name));
        }, []);

        res.render('admin/add-product', { categories, subcategories }); 
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).render('500', { title: 'Server Error' });
    }
});


router.post('/products/add', isAdmin, upload.single('image'), async (req, res) => {
    const { name, price, description, category, subcategory, characteristic1, characteristic2, characteristic3, availability, shortDescription, fullDescription } = req.body;
    const imageUrl = '/images/products/' + req.file.filename; // 

    try {
       
        if (!shortDescription || !fullDescription) {
            throw new Error('Необходимо заполнить оба поля: shortDescription и fullDescription');
        }

 
        if (isNaN(parseInt(availability))) {
            throw new Error('Некорректное значение для availability');
        }

        await Product.create({ 
            name, 
            price, 
            description, 
            category, 
            subcategory, 
            characteristic1, 
            characteristic2, 
            characteristic3, 
            availability: parseInt(availability),
            shortDescription, 
            fullDescription, 
            imageUrl 
        });
        res.redirect('/admin/products');
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).render('500', { title: 'Server Error' });
    }
});


router.get('/products/:id/edit', isAdmin, async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).render('404', { title: 'Product Not Found' });
        }

        const categories = await Category.findAll({ include: 'Subcategories' });

        const selectedCategory = categories.find(cat => cat.name === product.category);
        const subcategories = selectedCategory ? selectedCategory.Subcategories.map(sub => sub.name) : [];

        res.render('admin/edit-product', { product, categories, subcategories });
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).render('500', { title: 'Server Error' });
    }
});

router.post('/products/:id/edit', isAdmin, upload.single('image'), async (req, res) => {
    const { id } = req.params;
    const { name, price, description, category, subcategory } = req.body;
    let imageUrl = null;


    if (req.file) {
        imageUrl = '/images/products/' + req.file.filename;
    }

    try {

        await Product.update({
            name,
            price,
            description,
            category,
            subcategory, 
            imageUrl 
        }, { where: { id } });

        res.redirect('/admin/products');
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).render('500', { title: 'Server Error' });
    }
});


router.post('/products/:id/delete', isAdmin, async (req, res) => {
    const { id } = req.params;
    try {
        await Product.destroy({ where: { id } });
        res.redirect('/admin/products');
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).render('500', { title: 'Server Error' });
    }
});


router.get('/orders', isAdmin, async (req, res) => {
    try {
        const orders = await Order.findAll();
        res.render('admin/orders', { orders });
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).render('500', { title: 'Server Error' });
    }
});

router.post('/orders/:id/update-status', isAdmin, async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        await Order.update({ status }, { where: { id } });
        res.redirect('/admin/orders');
    } catch (error) {
        console.error('Error updating order status:', error);
        res.status(500).render('500', { title: 'Server Error' });
    }
});

module.exports = router;
