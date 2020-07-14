const express = require('express');
const db = require('../db/mysql');

const router = express.Router();

let errorsList = {
    'TITLE_REQUIRED': 'Title is required',
    'QUESTION_REQUIRED': 'Question text is required',
    'SUBJECT_REQUIRED': 'Subject is required',
};

//category select from the DB
let subj = {};

db.query('SELECT category_name FROM category ', (err, results) => {
    if (err) {
        throw new Error(err);
    }
    subj = results;
});

router.get('/question', function (req, res) {
    const {error_title, error_questionText, error_subject} = req.session;
    delete req.session.error_title;
    delete req.session.error_questionText;
    delete req.session.error_subject;

    res.render('homework-help/question', {
        error_title,
        error_questionText,
        error_subject,
        subj,
    });

});

router.post('/question', function (req, res) {

    const {title, 'question-text': questionText, subject, tags} = req.body;
    if (!title) {
        req.session.error_title = 'Title is required';
    }

    if (!questionText) {
        req.session.error_questionText = 'Question text is required';
    }

    if (!subject) {
        req.session.error_subject = 'Subject is required';
    }

    if (title && questionText && subject) {
        let filePath = null;

        if (req.files && req.files.file) {
            filePath = '/uploads/' + req.files.file.name;
            req.files.file.mv(__dirname + '/../public/' + filePath);
        }

        db.query(
            'INSERT INTO questions (title, description, category_id, tags, image_path) VALUES (?, ?, ?, ?, ?)',
            [title, questionText, subject, tags, filePath],
            (err, results) => {
                if (err) throw new Error(err);
                res.redirect('/');
            }
        );
    } else {
        res.redirect('/homework-help/question');
    }
});

router.get('/question/:id', function (req, res) {
    res.render('homework-help/question');
});

module.exports = router;
