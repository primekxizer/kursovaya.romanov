const express = require('express');
const router = express.Router();
const Subcategory = require('../models/Subcategory');

// Маршрут для отображения подкатегорий по категории
router.get('/subcategories', async (req, res) => {
    try {
        const category = req.query.category;
        const subcategories = await Subcategory.findAll({ where: { category } });
        res.json({ success: true, subcategories });
    } catch (err) {
        res.json({ success: false, message: 'Ошибка при загрузке подкатегорий' });
    }
});

module.exports = router;
