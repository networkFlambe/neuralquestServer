

var validateTrainRunInputs = function(options, ffnetSetup) {

  if(!checkInteger(options.iterations) || !validateRange(options.iterations, 1, 20000)) {
    return false;
  }
  if(!validateRange(options.errorThresh, 0, 1)) {
    return false;
  }
  if(!validateRange(ffnetSetup.learningRate, 0, 10)) {
    return false;
  }
  if(!Array.isArray(ffnetSetup.hiddenSizes)) {
    return false;
  }
  if(ffnetSetup.hiddenSizes.length > 5) {
    return false;
  }
  for(var i=0; i<ffnetSetup.hiddenSizes.length; i++) {
    var size = ffnetSetup.hiddenSizes[i];
    if(!checkInteger(size) || !validateRange(size, 1, 25)) {
      return false;
    }
  }
  //not doing validation on data or input for trained network server-side
  //should throw error on attempted training, if something wrong with these

  return true;

};


var validateIndex = function(n) {
  return checkInteger(n) && validateRange(n, 0, 9);
};

var checkInteger = function(n) {
  return n % 1 === 0;
}

var validateRange = function(n, lo, hi) {
  return n >= lo && n <= hi;
}

var round = function(value, decimals) {
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}


exports.validateTrainRunInputs = validateTrainRunInputs;
exports.round = round;

//export helper functions for testing
exports.validateIndex = validateIndex;
exports.checkInteger = checkInteger;
exports.validateRange = validateRange;

