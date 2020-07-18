const express = require('express');
const db = require('../db/mysql');
const {fetchCategories} = require('../models/categories');
const {fetchQuestions} = require('../models/questions');

const router = express.Router();

router.get('/', async function (req, res) {
    const subj = await fetchCategories();
    const questions = await fetchQuestions();

    res.render('index', {
        subj,
        questions,
    });
});




module.exports = router;
