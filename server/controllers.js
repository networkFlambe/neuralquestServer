var brain = require('brain');
var fs = require('fs');
var numeralnetobj = require('./assets/numeralNet.json');
var testdataobj = require('./assets/sampleMNIST.json'); 

//get trained MNIST brain
var numeralnet = new brain.NeuralNetwork();
numeralnet.fromJSON(numeralnetobj);

//get test data for MNIST brain
//var testdata = JSON.parse(testdataobj);

var simplenn = function(req) {
  var n = req.body.hidden;
  ffnet = new brain.NeuralNetwork({ hiddenlayers: [n] });
  return ffnet.train(data);
};

var trainRun = function(req) {
  var net;
  try {
    net = JSON.parse(req.body.net);
  }
  catch(err) {
    net = {};
  }
  
  //todo: add validation

  var data = net.data || [{input: [0, 0], output: [0]},
                          {input: [0, 1], output: [1]},
                          {input: [1, 0], output: [1]},
                          {input: [1, 1], output: [0]}];
  
  var hiddenLayers = net.hiddenLayers || 2;
  var errorThresh = net.errorThresh || 0.005; 
  var iterations = net.iterations || 20000;
  var log = net.log || true;
  var logPeriod = net.logPeriod || 100;
  var learningRate = learningRate || 0.3;
  var momentum = net.momentum || 0.3;
  var binaryThresh = net.binaryThresh || 0.5;
  var input = net.input || [[0,0], [0,1]];
  var answer = [];

  var options = {
    iterations: iterations,
    errorThresh: errorThresh,
    log: log,
    logPeriod: logPeriod
  };

  var ffnet = new brain.NeuralNetwork({
    learningRate: learningRate,
    hiddenSizes: hiddenLayers,
    momentum:momentum,
    binaryThresh:binaryThresh
  });

  answer.push(ffnet.train(data, options));

  for(var i = 0; i < input.length; i++) {
    answer.push(ffnet.run(input[i]));
  }
  
  var trainedBrain = ffnet.toJSON();

  var result = {
    answer: answer,
    params:{
      hiddenLayers: hiddenLayers,
      errorThresh: errorThresh,
      iterations: iterations,
      log: log,
      logPeriod: logPeriod,
      learningRate: learningRate,
      momentum: momentum,
      binaryThresh: binaryThresh,
      input: input
    },
    data: data, 
    trainedBrain: trainedBrain
  }

   //todo: does this need a callback??
  return result;
}


var runMNIST = function(req) {
  var net;
  try {
    net = JSON.parse(req.body.net);
  }
  catch(err) {
    net = {};
  }
  var checkIndex = net.numberToCheck || 0;

  var result = {
    trueValue: checkIndex,
    predictedValue: numeralnet.run(testdataobj[checkIndex])
  }

  return result;
};


exports.simplenn = simplenn;
exports.trainRun = trainRun;
exports.runMNIST = runMNIST;


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