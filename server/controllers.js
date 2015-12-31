var brain = require('brain');
var fs = require('fs');
var simpleMNISTobj = require('./assets/simpleMNIST.json')
var utils = require('./utils.js');
var simpleMNISTdata = require('./assets/simpleMNISTdata.json');

//below is to get trained MNIST brain and example input...not currently in use
//var numeralnetobj = require('./assets/numeralNet.json');
//var numeralnet = new brain.NeuralNetwork();
//numeralnet.fromJSON(numeralnetobj);
//var testdataobj = require('./assets/sampleMNIST.json'); 

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

    //validate nn setup & options 
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





var trainRunSimpleMNIST = function(req) {

  var net;
  try {
    net = req.body;
    //collect necessary info
    var data = simpleMNISTdata;
    
    var hiddenLayers = net.hiddenLayers || 17;
    var errorThresh = net.errorThresh || 0.005; 
    var iterations = net.iterations || 20000;
    var log = net.log || true;
    var logPeriod = net.logPeriod || 1000;
    var learningRate = net.learningRate || 0.01;
    var momentum = net.momentum || 0.3;
    var binaryThresh = net.binaryThresh || 0.5;
    var input = net.input || [
                            1, 1, 1, 1, 1,
                            1, 0, 0, 0, 1,
                            1, 0, 0, 0, 1,
                            1, 0, 0, 0, 1,
                            1, 1, 1, 1, 1
                            ];
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

    //validate nn setup & options 
    //same validation rules here as for trainRun, 
    //but with additional check of simple digit input
    if(utils.validateTrainRunInputs(options, ffnetSetup) && utils.validateSimpleMNISTinput(input)) {
      var ffnet = new brain.NeuralNetwork(ffnetSetup);

      answer.push(ffnet.train(data, options));

      //this is different from trainRun above where we check all possible inputs
      //here we just check one single input
      var inputTest = ffnet.run(input);
      var inputTestRounded = [];
      inputTest.forEach(function(n) {
        inputTestRounded.push(utils.round(n, 3));
      })
      answer.push(inputTestRounded);
      
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
        }
        //data: data, 
        //trainedBrain: trainedBrain
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
exports.trainRunSimpleMNIST = trainRunSimpleMNIST;
