const db = require('../db/mysql');

function fetchQuestions() {
    return new Promise((resolve, reject) => {

        db.query('SELECT questions.id, title,SUBSTRING(description, 1, 50) AS description, category_name, COUNT(answers.id) AS answers_count ' +
            ' FROM questions ' +
            ' LEFT JOIN category ' +
            ' ON questions.category_id = category.category_id ' +
            ' LEFT JOIN answers ' +
            ' ON answers.question_id = questions.id ' +
            ' GROUP BY questions.id', (err, results) => {

            if (err) {
                reject(err);
            }
            resolve(results);
        });
    });
}

function fetchQuestion(id) {
    return new Promise((resolve, reject) => {
        db.query('SELECT id, title, description, category_name FROM questions LEFT JOIN category ON questions.category_id = category.category_id WHERE id = ?', id, (err, results) => {
            if (err) {
                reject(err);
            }
            resolve(results);
        });
    });
}

module.exports = {
    fetchQuestions,
    fetchQuestion,
};