const db = require('../db/mysql');

function fetchQuestions() {
    return new Promise((resolve, reject) => {
        db.query('SELECT id, title,SUBSTRING(description, 1, 50) AS description, category_name FROM questions LEFT JOIN category ON questions.category_id = category.category_id', (err, results) => {
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
}