var request = require("request");

var base_url = "http://localhost:3000/"

describe("server.js", function() {

  describe("GET /", function() {
    it("returns status code 200", function(done) {
      request.get(base_url).on('response', function(response) {
        console.log("test1", response.statusCode);
        expect(response.statusCode).toBe(200);
        done();
      });
    });
  });

  describe("GET /postList", function() {
    it("returns status code 200", function(done) {
      request.get(base_url + "postList")
      .on('response', function(response) {
        console.log("test2", response.statusCode);
        expect(response.statusCode).toBe(200);
        done();
      });
    });
  });

  describe('POST /authenticate', function() {

    it("returns status code 200 if user and password match", function(done) {
      request.post(base_url + "authenticate", { 'username': "raphael", 'password': "shoes" })
      .on('response', function(err, response, body) {
        console.log("test3", response);
        expect(response.statusCode).toBe(200);
        done();
      });
    });
  });

});
