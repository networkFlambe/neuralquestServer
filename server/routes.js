var controllers = require('./controllers.js');

module.exports = function(app, express) {

  var apiRouter = express.Router();

  apiRouter.use(require('express-promise')());

  apiRouter.use(function(req, res, next) {
    console.log('Somebody just came to our api!');
    next();
  });

  apiRouter.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
  });

  apiRouter.route('/simplenn')
    .post(function(req, res) {
      res.json({result: controllers.simplenn(req)});
    });

  apiRouter.route('/trainRun')
    .post(function(req, res) {
      res.json({result: controllers.trainRun(req)});
    });  

  return apiRouter;

}
