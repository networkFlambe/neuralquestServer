var expect = require('chai').expect;
var server = require('../server.js');
var routes = require('../server/routes.js');
var controllers = require('../server/controllers.js')
var supertest = require('supertest')
var express = ('express');
//initialize?

var request = supertest.agent(server);


//server tests
describe('server', function(){
  describe('GET /', function(){
    
    it('should return Welcome to the home page!', function(done){
      request.get('/')
             .expect(/Welcome/, done);
    });

  });
});

describe('simplenn', function(){
  it('simplenn should exist', function(){
    expect(controllers.simplenn).to.exist;
  })
});
