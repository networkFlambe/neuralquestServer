var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var morgan = require('morgan');


var app = express();
var port = process.env.PORT || 1337;
app.use(require('express-promise')());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
  next();
});

app.use(morgan('dev'));

app.get('/', function(req, res) {
  res.send('Welcome to the home page!');
});

var apiRouter = require('./routes.js')(app, express);

app.use('/api', apiRouter);

app.listen(port);
console.log('listening on ' + port);