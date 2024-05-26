const Product = require('../models/Product');


exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.render('products', { title: 'Все товары', products: products });
    } catch (err) {
        console.error('Error getting products:', err);
        res.redirect('/admin');
    }
};


exports.getCreateProductPage = function(req, res) {
    res.render('create-product', { title: 'Создание нового товара' });
};


exports.createProduct = async (req, res) => {
    const { name, price, description } = req.body;

    try {
        const product = new Product({
            name: name,
            price: price,
            description: description
        });

        await product.save();
        res.redirect('/admin/products');
    } catch (err) {
        console.error('Error creating product:', err);
        res.redirect('/admin/products');
    }
};


exports.getEditProductPage = async (req, res) => {
    const productId = req.params.id;

    try {
        const product = await Product.findById(productId);
        if (!product) {
            res.redirect('/admin/products');
        } else {
            res.render('edit-product', { title: 'Редактирование товара', product: product });
        }
    } catch (err) {
        console.error('Error finding product:', err);
        res.redirect('/admin/products');
    }
};


exports.saveEditedProduct = async (req, res) => {
    const productId = req.params.id;
    const { name, price, description } = req.body;

    try {
        await Product.findByIdAndUpdate(productId, { name: name, price: price, description: description });
        res.redirect('/admin/products');
    } catch (err) {
        console.error('Error saving edited product:', err);
        res.redirect('/admin/products');
    }
};


exports.deleteProduct = async (req, res) => {
    const productId = req.params.id;

    try {
        await Product.findByIdAndDelete(productId);
        res.redirect('/admin/products');
    } catch (err) {
        console.error('Error deleting product:', err);
        res.redirect('/admin/products');
    }
};
