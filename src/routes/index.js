const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
    res.render('index', { title: 'Заголовок страницы', body: 'Содержимое страницы' });
});

module.exports = router;
