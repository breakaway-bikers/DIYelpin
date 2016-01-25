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
    sharedPropertyService.setProperty(null);
    return $http.get('/signin').then(function(response) {
      return response.data;
    });

  };

  return {
    setPost: setPost,
    signOut: signOut,
  };
}])

.service('sharedPropertyService', [function(value) {
  console.log('going into service');
  var property = 'name';
  console.log('this is the property', property);

  var getProperty = function() {
    return property;
  };

  var setProperty = function(value) {
    property = value;
  };

  return {
    getProperty: getProperty,
    setProperty: setProperty,
  };
}]);
