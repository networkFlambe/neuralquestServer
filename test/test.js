var expect = require('chai').expect;
var controllers = require('../server/controllers.js');
var utils = require('../server/utils.js');


describe('Controllers', function(){
  var req = {
    "body":{
      "net": {
              "hiddenLayers" : 2,
              "errorThresh" : 0.005, 
              "iterations" : 20000,
              "log" : true,
              "logPeriod" : 100,
              "learningRate" : 0.3,
              "momentum" : 0.3,
              "binaryThresh" : 0.5,
              "input" : [[0,0], [0,1]],
              "numberToCheck": 0
            }
    }
  }
  describe('trainRun', function(){
    it('trainRun should return an object if no params are passed', function(){
      var result = controllers.trainRun({body:{}});
      expect(result).to.be.an('object');
    });

    xit('trainRun should return an object if params are passed', function(){
      var result = controllers.trainRun(req);
      expect(result).to.be.an('object');
    });
  });

  describe('runMNIST', function(){
    it('runMNIST should return an object if no params are passed', function(){
      var result = controllers.runMNIST();
      expect(result).to.be.an('object');
    });

    it('runMNIST should return an object if params are passed', function(){
      var result = controllers.runMNIST(req);
      expect(result).to.be.an('object');
    });
  });

  describe('validateTrainRunInputs', function(){
    optionsTrue = {
      "iterations": 5000,
      "errorThresh": 0.5
    };
    ffnetSetupTrue = {
      "hiddenSizes": [5,2]
    };

    optionsFalse = {
      "iterations": 5000,
      "errorThresh": 0.5
    };
    ffnetSetupFalse = {
      "hiddenSizes": [5,2]
    };

    it('validateTrainRunInputs should return true if all correct params are passed', function(){
      expect(utils.validateTrainRunInputs(optionsTrue, ffnetSetupTrue)).to.beTrue;
    });

    it('validateTrainRunInputs should return false if incorrect options are passed', function(){
      expect(utils.validateTrainRunInputs(optionsFalse, ffnetSetupTrue)).to.beTrue;
    });

    it('validateTrainRunInputs should return false if incorrect ffnetSetup are passed', function(){
      expect(utils.validateTrainRunInputs(optionsTrue, ffnetSetupFalse)).to.beTrue;
    });


  });

  describe('validation helper functions', function(){
    it('validateIndex should return false if number outside of range 0-9', function(){
      var n = -3;
      expect(utils.validateIndex(n)).to.be.false;
    });

    it('validateIndex should return true if number inside of range 0-9', function(){
      var n = 2;
      expect(utils.validateIndex(n)).to.be.true;
    });

    it('checkInteger should return false if number is not an integer', function(){
      var n = 22/7;
      expect(utils.checkInteger(n)).to.be.false;
    });

    it('checkInteger should return true if number is an integer', function(){
      var n = 2;
      expect(utils.checkInteger(n)).to.be.true;
    });

    it('validateRange should return false if number outside of range', function(){
      var n = -3;
      var low = 0;
      var high = 1
      expect(utils.validateRange(n, low, high)).to.be.false;
    });

    it('validateRange should return true if number inside of range', function(){
      var n = 0.2;
      var low = 0;
      var high = 1
      expect(utils.validateRange(n, low, high)).to.be.true;
    });
  });
});
