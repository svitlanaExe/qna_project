const express = require('express');
const db = require('../db/mysql');
const {fetchCategories} = require('../models/categories');
const {fetchQuestion} = require('../models/questions');
const {fetchAnswers, addAnswers} = require('../models/answers');
const {fetchUsers} = require('../models/users');

const router = express.Router();

let errorsList = {
    'TITLE_REQUIRED': 'Title is required',
    'QUESTION_REQUIRED': 'Question text is required',
    'SUBJECT_REQUIRED': 'Subject is required',
};


router.get('/question', async function (req, res) {
    const {error_title, error_questionText, error_subject} = req.session;
    delete req.session.error_title;
    delete req.session.error_questionText;
    delete req.session.error_subject;

    const subj = await fetchCategories();
    console.log(subj);

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

router.post('/answer', async function (req, res) {
    const { user_id, answer_text, question_id} = req.body;
    console.log(question_id);
    if(!user_id || !answer_text || !question_id) {
        console.error('ALARMA!');
        res.redirect('/homework-help/questions');
    } else {
        await addAnswers({user_id, answer_text, question_id});
        res.redirect(`/homework-help/question/${question_id}`);
    }

});

router.get('/question/:id', async function (req, res) {
    const questionId = req.params.id;
    const question = await fetchQuestion(req.params.id);
    const answers = await fetchAnswers(questionId);
    const users = await fetchUsers();

    console.log(answers);
    res.render('homework-help/question-preview', {
        question: question[0],
        answers,
        users,
        questionId
     //   question_id: req.params.id,

    });
});


module.exports = router;
