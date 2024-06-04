const express = require('express');
const router = express.Router();
const Subcategory = require('../models/Subcategory');

// Маршрут для отображения подкатегорий конкретной категории
router.get('/:categoryId', async (req, res) => {
    const { categoryId } = req.params;
    try {
        const subcategories = await Subcategory.findAll({ where: { categoryId } });
        res.render('subcategories', { subcategories });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
