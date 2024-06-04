const express = require('express');
const router = express.Router();
const Subcategory = require('../models/Subcategory');

// Маршрут для получения подкатегорий конкретной категории
router.get('/:categoryId/subcategories', async (req, res) => {
    const { categoryId } = req.params;
    try {
        const subcategories = await Subcategory.findAll({ where: { categoryId } });
        res.json({ success: true, subcategories });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

module.exports = router;
