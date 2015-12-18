var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var morgan = require('morgan');

//nn setup:::::::::::::::::::::::::::::::::::::::
var brain = require('brain');
var data = [{input: [0, 0], output: [0]},
           {input: [0, 1], output: [1]},
           {input: [1, 0], output: [1]},
           {input: [1, 1], output: [0]}];
//nn setup:::::::::::::::::::::::::::::::::::::::


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

var apiRouter = express.Router();

apiRouter.use(function(req, res, next) {
  console.log('Somebody just came to our api!');
  next();
})

apiRouter.get('/', function(req, res) {
  res.json({ message: 'hooray! welcome to our api!' });
});

apiRouter.route('/simplenn')
  .post(function(req, res) {
    var params = {};
    params.hidden = Number(req.body.hidden);
    params.learnRate = req.body.learnRate;

    ffnet = new brain.NeuralNetwork({ hiddenlayers: [params.hidden] });

    res.json({result: ffnet.train(data)});
  })

app.use('/api', apiRouter);

app.listen(port);
console.log('listening on ' + port);