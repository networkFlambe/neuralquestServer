var brain = require('brain');

//nn setup:::::::::::::::::::::::::::::::::::::::
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

var trainRun = function(req) {
  var net = JSON.parse(req.body.net);
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

 // if(net.netTrain){
    answer.push(ffnet.train(data, options));
  //}

  //if(net.netTrain && net.netRun){

    for(var i = 0; i < input.length; i++){
      answer.push(ffnet.run(input[i]));
    //}
    var trainedBrain = ffnet.toJSON();
  }

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

exports.simplenn = simplenn;
exports.trainRun = trainRun;


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