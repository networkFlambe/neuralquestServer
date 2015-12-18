var expect = require('chai').expect;
var server = require('../server.js');
var routes = require('../server/routes.js');
var controllers = require('../server/controllers.js')
var request = require('request')

//initialize?


//server tests
describe('server', function(){
  describe('GET /', function(){
    it('should return Welcome to the home page!', function(done){
      request.get('/')
             .expect(200, 'Welcome to the home page!');
             done()
    });
  });
});

describe('controllers', function(){
  describe('simpleMath', function(){
    it('should add 1 to value n', function(){
      n = 1;
      controllers.simpleMath(n);
      expect(n).to.equal(2);
    });
  });

  describe('simplenn', function(){
    it('simplenn should exist', function(){
      expect(controllers.simplenn).to.exist;
    })
  })
});