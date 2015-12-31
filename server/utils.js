

var validateTrainRunInputs = function(options, ffnetSetup) {
  //validate each option and setup parameter using helper functions below
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
  //if passed all above tests, return true
  return true;
};




var validateSimpleMNISTinput = function(input) {
  if(input.constructor !== Array) {
    return false;
  }
  if(input.length !== 25) {
    return false;
  }
  var allowedInputs = {
    '1': true,
    '0': true
  };
  for(var i=0; i<input.length; i++) {
    var item = input[i];
    if(allowedInputs[item] === undefined) {
      return false;
    }
  }
  //if passed all above tests, return true
  return true;
}




//:::::::::::::::::::::::HELPER FUNCTIONS::::::::::::::::::::::::::
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
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::



//export functions to be used by other modules
exports.validateTrainRunInputs = validateTrainRunInputs;
exports.round = round;
exports.validateSimpleMNISTinput = validateSimpleMNISTinput;



//export helper functions below solely for testing
exports.validateIndex = validateIndex;
exports.checkInteger = checkInteger;
exports.validateRange = validateRange;

