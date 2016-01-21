var request = require("request");

var base_url = "http://localhost:3000/"

describe("server.js", function() {
  describe("GET /", function() {
    it("returns status code 200", function(done) {
      request.get(base_url, function(error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });

  });

  describe('POST /authenticate', function() {

    it("returns status code 200", function(done) {
      request.post({
          headers: {'content-type' : 'application/x-www-form-urlencoded'},
          url:     base_url + 'authenticate',
          body:    {name: 'raph', password: 'raph'}
        }, function(error, response, body) {
          console.log(error, response, body)
        expect(response.statusCode).toBe(200);
        done();
      });
    });
  });
});
