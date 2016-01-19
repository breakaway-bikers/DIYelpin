angular.module('yelpin.factory', [])

.factory('appFactory', ['$http', function($http) {

  var setPost = function() {
    return $http.post('/yelpin', json).then(function(response) {
      return req.body;
    });
  };

  return {
    setPost: setPost
  };
}]);
