var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');


var config = require('./config');
var User = require('./app/model/user');
var ApiRouter = require('./app/route/ApiRouter');

var port = process.env.PORT || 3000;

mongoose.connect(config.database);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(morgan('dev'));

app.get('/', function (req, res) {
    res.send('Hello, the index api');
});

app.get('/setup', function (req, res) {
    var nick = new User({
        name: 'Pao',
        password: '123456',
        admin: true
    });
    nick.save(function (err) {
        if (err) throw err;
        console.log('User save successfully');
        res.json({success: true});
    })
});

app.use('/api',ApiRouter);

app.listen(port);

console.log('Server is running on ', port);

