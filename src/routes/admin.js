

const express = require('express');
const router = express.Router();


router.get('/', function(req, res) {
    res.render('admin', { title: 'Панель администратора' });
});


router.get('/add', function(req, res) {
    res.render('add-product', { title: 'Добавить товар' });
});

router.post('/add', function(req, res) {
});


router.get('/edit/:id', function(req, res) {

});


router.post('/edit/:id', function(req, res) {

});


router.post('/delete/:id', function(req, res) {

});

module.exports = router;
