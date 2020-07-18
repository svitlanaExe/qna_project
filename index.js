const express = require('express');
const auth = require('./modules/auth');
const homeworkHelp = require('./modules/homework-help');
const homePage = require('./modules/homepage');
const bodyParser = require('body-parser');
const session = require('express-session');
const fileUpload = require('express-fileupload');

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

server.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/',
    limits: { fileSize: 50 * 1024 * 1024 },
}));

server.use(
    session({
        secret: 'my super duper secret',
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 60000,
        },
    })
);

server.use('/', homePage);
server.use('/auth', auth);
server.use('/homework-help', homeworkHelp);



server.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
