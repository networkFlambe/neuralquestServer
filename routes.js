var brain = require('brain');

//nn setup:::::::::::::::::::::::::::::::::::::::
var brain = require('brain');
var data = [{input: [0, 0], output: [0]},
           {input: [0, 1], output: [1]},
           {input: [1, 0], output: [1]},
           {input: [1, 1], output: [0]}];
//nn setup:::::::::::::::::::::::::::::::::::::::

module.exports = function(app, express) {

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

  return apiRouter;

}
