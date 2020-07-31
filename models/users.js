const db = require('../db/mysql');

function fetchUsers() {
    return new Promise((resolve, reject) => {
        db.query('SELECT id, username FROM users ', (err, results) => {
            if (err) {
                reject(err);
            }
            resolve(results);
        });
    });
}

module.exports = {
    fetchUsers,
}