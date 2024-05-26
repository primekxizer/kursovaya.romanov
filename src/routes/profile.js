// routes/profile.js
const express = require('express');
const router = express.Router();

// Отображение страницы профиля
router.get('/', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }

    res.render('profile', { user: req.session.user });
});

module.exports = router;
