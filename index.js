const express = require('express');
const auth = require('./modules/auth');
const bodyParser = require('body-parser');

const server = express();
const port = 3000;

server.set('view engine', 'ejs');
server.set('views', './views');

server.use(express.static('public'));
server.use(
    bodyParser.urlencoded({
        extended: false,
    })
);

server.use('/', auth);

server.get('/', (req, res) => {
    res.render('index');
});

server.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
