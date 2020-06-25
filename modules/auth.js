const express = require('express');
const crypto = require('crypto');

const router = express.Router();

router.get('/login', function (req, res) {
    res.render('login', {
        error: !!req.query.error,
    });
});

router.get('/registration', function (req, res) {
    res.render('registration', {
        error: !!req.query.error,
    });
});

router.post('/login', function (req, res) {
    const { username, password } = req.body;

    try {
        if (!username || !password) {
            throw new Error('Params are empty');
        }
    } catch (error) {
        res.redirect('./login?error=1');
    }
});

router.post('/registration', function (req, res) {
    const { username, password1, password2 } = req.body;
    try {
        if (!username || !password1 || !password2 || !(password1 === password2)) {
            throw new Error("Params are empty or passwords don't match");
        }
    } catch (error) {
        res.redirect('./registration?error=1');
    }
});

module.exports = router;

