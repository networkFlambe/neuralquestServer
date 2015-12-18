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


exports.simplenn = simplenn;

