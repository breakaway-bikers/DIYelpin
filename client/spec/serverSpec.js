var request = require('request');

var baseUrl = 'http://localhost:3000/';

describe('server.js', function() {

  describe('GET /', function() {
    it('returns status code 200', function(done) {
      request.get(baseUrl).on('response', function(response) {
        console.log('test1', response.statusCode);
        expect(response.statusCode).toBe(200);
        done();
      });
    });
  });

  describe('GET /postList', function() {
    it('returns status code 200', function(done) {
      request.get(baseUrl + 'postList')
      .on('response', function(response) {
        console.log('test2', response.statusCode);
        expect(response.statusCode).toBe(200);
        done();
      });
    });
  });

  describe('POST /authenticate', function() {

    it('returns status code 200 if user and password match', function(done) {
      request({
        url: baseUrl + 'authenticate',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        json: { username: 'raphael', password: 'shoes' },
      }, function(error, response, body) {
        if (error) {
          console.log(error);
        } else {
          console.log(response.statusCode, body);
          expect(response.statusCode).toBe(200);
          done();
        }
      });

    });
  });

});
