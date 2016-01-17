angular.module('yelpin.services', [])

.factory('appFactory', ['$http', function($http) {

  var setPost = function() {
    return $http.post('not sure where', json).then(function(response) {
      return req.body;
    });
  };
}]);
