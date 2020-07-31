const db = require('../db/mysql');

function fetchAnswers(id) {
    return new Promise((resolve, reject) => {
        db.query('SELECT answers.id AS answer_id, user_id, username, text FROM answers ' +
            'LEFT JOIN users ' +
            'ON answers.user_id = users.id ' +
            'WHERE question_id = ?', id, (err, results) => {
            if (err) {
                reject(err);
            }
            resolve(results);
        });
    });
}

function addAnswer(params) {
    const { user_id, answer_text, question_id } = params;

    return new Promise((resolve, reject) => {
        db.query('INSERT INTO answers (question_id, user_id, text) VALUES (?, ?, ?)',[question_id, user_id, answer_text], (err, results) => {
            if (err) {
                reject(err);
            }
            resolve(results);
        });
    });
}

module.exports = {
    fetchAnswers,
    addAnswer,
};