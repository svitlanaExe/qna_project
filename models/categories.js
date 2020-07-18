const db = require('../db/mysql');

function fetchCategories() {
    return new Promise((resolve, reject) => {
        db.query('SELECT category_id, category_name FROM category ', (err, results) => {
            if (err) {
                reject(err);
            }
            resolve(results);
        });
    });
}

module.exports = {
    fetchCategories,
}