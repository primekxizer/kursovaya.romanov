const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const Product = require('../models/Product');

const categories = [
    { name: 'Одежда', Subcategories: ['Худи', 'Футболки'] },
    { name: 'Бренды', Subcategories: ['Adidas', 'Nike'] },
    { name: 'Обувь', Subcategories: ['Asics', 'Salomon'] },
    { name: 'Аксессуары', Subcategories: ['Рюкзаки', 'Кошельки'] },
    { name: 'Электроника', Subcategories: ['Смартфоны', 'Наушники'] }
];

router.get('/', async (req, res) => {
    try {
        const { category, subcategory, color, brand, collection, size, releaseYear, manufacturer, storage, signalType, sort, search } = req.query;
        let whereClause = {};
        let orderClause = [];
        
        if (category) {
            whereClause.category = category;
        }
        if (subcategory) {
            whereClause.subcategory = subcategory;
        }
        if (color) {
            whereClause.color = { [Op.in]: Array.isArray(color) ? color : [color] };
        }
        if (brand) {
            whereClause.brand = { [Op.in]: Array.isArray(brand) ? brand : [brand] };
        }
        if (collection) {
            whereClause.collection = { [Op.in]: Array.isArray(collection) ? collection : [collection] };
        }
        if (size) {
            whereClause.size = { [Op.in]: Array.isArray(size) ? size : [size] };
        }
        if (releaseYear) {
            whereClause.releaseYear = { [Op.in]: Array.isArray(releaseYear) ? releaseYear : [releaseYear] };
        }
        if (manufacturer) {
            whereClause.manufacturer = { [Op.in]: Array.isArray(manufacturer) ? manufacturer : [manufacturer] };
        }
        if (storage) {
            whereClause.storage = { [Op.in]: Array.isArray(storage) ? storage : [storage] };
        }
        if (signalType) {
            whereClause.signalType = { [Op.in]: Array.isArray(signalType) ? signalType : [signalType] };
        }
        if (search) {
            whereClause.name = { [Op.like]: `%${search}%` };
        }

        if (sort) {
            switch (sort) {
                case 'price_asc':
                    orderClause.push(['price', 'ASC']);
                    break;
                case 'price_desc':
                    orderClause.push(['price', 'DESC']);
                    break;
                case 'name_asc':
                    orderClause.push(['name', 'ASC']);
                    break;
                case 'name_desc':
                    orderClause.push(['name', 'DESC']);
                    break;
                case 'availability':
                    orderClause.push(['availability', 'DESC']);
                    break;
                default:
                    break;
            }
        }

        const products = await Product.findAll({ where: whereClause, order: orderClause });

        res.render('products', {
            title: 'Каталог товаров',
            products,
            categories,
            category,
            subcategory,
            color: Array.isArray(color) ? color : [color],
            brand: Array.isArray(brand) ? brand : [brand],
            collection: Array.isArray(collection) ? collection : [collection],
            size: Array.isArray(size) ? size : [size],
            releaseYear: Array.isArray(releaseYear) ? releaseYear : [releaseYear],
            manufacturer: Array.isArray(manufacturer) ? manufacturer : [manufacturer],
            storage: Array.isArray(storage) ? storage : [storage],
            signalType: Array.isArray(signalType) ? signalType : [signalType],
            sort,
            search: search || '',
            user: req.session.user 
        });

    } catch (error) {
        console.error(error);
        res.status(500).render('500', { title: 'Server Error' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (product) {
            res.render('product', { title: product.name, product, user: req.session.user }); 
        } else {
            res.status(404).render('404', { title: 'Product Not Found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).render('500', { title: 'Server Error' });
    }
});

router.post('/cart/add', async (req, res) => {
    try {
        const { userId, productId, name, price } = req.body;



        res.json({ message: 'Product added to cart successfully' });
    } catch (error) {
        console.error('Error adding product to cart:', error);
        res.status(500).json({ error: 'Failed to add product to cart' });
    }
});

module.exports = router;
