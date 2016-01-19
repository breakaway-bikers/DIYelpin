angular.module('yelpin.factory', [])

.factory('appFactory', ['$http', function($http) {

  var setPost = function(message) {
    //I've got to fix this pathway
    return $http.post('#/createPost', message).then(function(response) {
      return response.data;
      console.log(response.data);
    });
  };

  return {
    setPost: setPost,
  };
}]);
