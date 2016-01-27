angular.module('yelpin.factory', [])

.factory('appFactory', ['$http', 'sharedPropertyService', function($http, sharedPropertyService) {

  var setPost = function(message) {
    //I've got to fix this pathway
    return $http.post('/createPost', message).then(function(response) {
      return response.data;
      console.log(response.data);
    });

  };

  var signOut = function() {
    sharedPropertyService.destroyProperty();
  };

  return {
    setPost: setPost,
    signOut: signOut,
  };
}])

.service('sharedPropertyService',['$window', '$state', function($window, $state) {
  console.log('going into service');

  var getProperty = function() {
    return $window.localStorage.getItem('com.diy');
  };

  var setProperty = function(value) {
    $window.localStorage.setItem('com.diy',value);
  };

  var destroyProperty = function() {
    $window.localStorage.removeItem('com.diy');
  };

  var checkAuth = function() {
    if (!$window.localStorage.getItem('com.diy')) {
      $state.go('signin');
    }
  };

  return {
    getProperty: getProperty,
    setProperty: setProperty,
    destoryProperty: destroyProperty,
    checkAuth: checkAuth
  };
}]);
