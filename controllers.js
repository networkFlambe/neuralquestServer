var brain = require('brain');

//nn setup:::::::::::::::::::::::::::::::::::::::
var brain = require('brain');
var data = [{input: [0, 0], output: [0]},
           {input: [0, 1], output: [1]},
           {input: [1, 0], output: [1]},
           {input: [1, 1], output: [0]}];
//nn setup:::::::::::::::::::::::::::::::::::::::

var simplenn = function(req) {
  var n = req.body.hidden;
  ffnet = new brain.NeuralNetwork({ hiddenlayers: [n] });
  return ffnet.train(data);
};

var ffbrain = function(req) {
  var net = JSON.parse(req.body.net);
  //todo: add validation
  var hidden = net.hidden;
  var data = net.data;
  ffnet = new brain.NeuralNetwork({ hiddenlayers: hidden });
  //todo: does this need a callback??
  ffnet.train(data);
  return ffnet.toJSON();
}


exports.simplenn = simplenn;
exports.ffbrain = ffbrain;
