var brain = require('brain');
var fs = require('fs');
var numeralnetobj = require('./assets/numeralNet.json');
var simpleMNISTobj = require('./assets/simpleMNIST.json')
var testdataobj = require('./assets/sampleMNIST.json'); 
var utils = require('./utils.js');

//get trained MNIST brain
var numeralnet = new brain.NeuralNetwork();
numeralnet.fromJSON(numeralnetobj);

var simpleMNIST = new brain.NeuralNetwork();
simpleMNIST.fromJSON(simpleMNISTobj);

var trainRun = function(req) {

  var net;
  try {
    net = req.body;
    //collect necessary info
    var data = net.data || [{input: [0, 0], output: [0]},
                            {input: [0, 1], output: [1]},
                            {input: [1, 0], output: [1]},
                            {input: [1, 1], output: [0]}];
    
    var hiddenLayers = net.hiddenLayers || 2;
    var errorThresh = net.errorThresh || 0.005; 
    var iterations = net.iterations || 20000;
    var log = net.log || true;
    var logPeriod = net.logPeriod || 100;
    var learningRate = net.learningRate || 0.3;
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

    var ffnetSetup = {
      learningRate: learningRate,
      hiddenSizes: hiddenLayers,
      momentum:momentum,
      binaryThresh:binaryThresh
    };

    //validate
    if(utils.validateTrainRunInputs(options, ffnetSetup)) {
      var ffnet = new brain.NeuralNetwork(ffnetSetup);

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

      return result;
    } else {
      return 'error';
    }
  }
  catch(err) {
    net = {};
  }
};

var simpleMNIST = function(req) {
  var net;
  try {
    net = req.body;
  }
  catch(err) {
    net = {};
  }
  var input = net.input || [
                                  1, 1, 1, 1, 1,
                                  1, 0, 0, 0, 1,
                                  1, 0, 0, 0, 1,
                                  1, 0, 0, 0, 1,
                                  1, 1, 1, 1, 1
                                  ];

  if(input.length === 25) {
    var result = {
      predictedValue: simpleMNIST.run(input)
    }
    return result;gits
  } else {
    return 'error';
  }

};

var runMNIST = function(req) {
  var net;
  try {
    net = req.body;
    var checkIndex = net.numberToCheck || 0;

    if(utils.validateIndex(checkIndex)) {
      var result = {
        trueValue: checkIndex,
        predictedValue: numeralnet.run(testdataobj[checkIndex])
      }
      return result;
    } else {
      return 'error';
    }
  }
  catch(err) {
    net = {};
  }

};

exports.trainRun = trainRun;
exports.simpleMNIST = simpleMNIST;
exports.runMNIST = runMNIST;

