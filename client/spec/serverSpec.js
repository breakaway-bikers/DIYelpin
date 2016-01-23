var request = require("request");

var base_url = "http://localhost:3000/"

describe("server.js", function() {

  describe("GET /", function() {
    xit("returns status code 200", function(done) {
      request.get(base_url).on('response', function(response) {
        console.log("test1", response.statusCode);
        expect(response.statusCode).toBe(200);
        done();
      });
    });
  });

  describe("GET /postList", function() {
    xit("returns status code 200", function(done) {
      request.get(base_url + "postList")
      .on('response', function(response) {
        console.log("test2", response.statusCode);
        expect(response.statusCode).toBe(200);
        done();
      });
    });
  });

  describe('POST /authenticate', function() {

    xit("returns status code 200 if user and password match", function(done) {
      request.post(base_url + "authenticate", { 'username': "raphael", 'password': "shoes" })
      .on('response', function(err, response, body) {
        console.log("test3", response);
        expect(response.statusCode).toBe(200);
        done();
      });
    });
    it('returns status code 200 if user and password match', function(done) {
      request({
        url: base_url + 'authenticate', //URL to hit
        qs: {username: 'raphael', password: 'shoes'}, //Query string data
        method: 'POST', //Specify the method
        headers: { //We can define headers too
          'Content-Type': 'application/json',
          // 'Custom-Header': 'Custom Value'
        },
        json: {username: 'raphael', password: 'shoes'}
      }, function(error, response, body) {
        if(error) {
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
