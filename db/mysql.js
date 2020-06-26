const mysql = require('mysql');
const connection = mysql.createConnection({
    host: '0.0.0.0',
    user: 'root',
    password: process.env.MYSQL_PASSWORD,
    database: 'demo',
});

connection.connect((error) => {
    if(error) {
        console.log(error);
    } else {
        console.log('Connected!');
    }
});

module.exports = connection;