angular.module('yelpin.services', [])

.factory('ViewPost',['$http', function($http) {
  var savedData = {};

  var set = function(data) {
    savedData = data;
  };

  var get = function() {
    return savedData;
  };

  var getSinglePost = function (id) {
    return $http.get('/viewPost/' + id).then(function(res){
      console.log("got a response))))))", res.data);
      return res.data;
    })
  }

  return {
    set: set,
    get: get,
    getSinglePost: getSinglePost
  };
}]);
