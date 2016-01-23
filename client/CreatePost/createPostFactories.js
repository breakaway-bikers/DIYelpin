angular.module('yelpin.factory', [])

.factory('appFactory', ['$http', function($http) {

  var setPost = function(message) {
    //I've got to fix this pathway

  };

  return {
    setPost: setPost,
  };
}]);
