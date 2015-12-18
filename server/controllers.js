var brain = require('brain');

//nn setup:::::::::::::::::::::::::::::::::::::::
var brain = require('brain');
var data = [{input: [0, 0], output: [0]},
           {input: [0, 1], output: [1]},
           {input: [1, 0], output: [1]},
           {input: [1, 1], output: [0]}];
//nn setup:::::::::::::::::::::::::::::::::::::::


var simpleMath = function(n){
  return n + 1;
};

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

exports.simpleMath = simpleMath;
exports.simplenn = simplenn;
exports.ffbrain = ffbrain;


// var validateHidden = function(net) {
//   var hidden = net.hidden;
//   if(hidden.constructor !== Array) {
//     return false;
//   }
//   if(hidden.length < 1 || hidden.length > 3) {
//     return false;
//   }
//   hidden.forEach(function(item) {
//     if(typeof item !== Number) {
//       return false;
//     }
//     if(item < 1 || item > 5) {
//       return false;
//     }
//     if(item % 1 !== 0) {
//       return false;
//     }
//   }
//   return true;
// }