

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