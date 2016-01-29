angular.module('yelpin.factory', [])

.factory('appFactory', ['$http', 'sharedPropertyService', 'Upload', function($http, sharedPropertyService, Upload) {

  var setPost = function(message) {
    return $http.post('/createPost', message).then(function(response) {
      return response.data;
      console.log(response.data);
    });

  };

  var signOut = function() {
    sharedPropertyService.destroyProperty();
  };

  var postToPage = function(file, postData){
    console.log("\n\nfile name is: ", file.name, "\n\n");
    file.upload = Upload.upload({
          url: '/createPost',
          data: { file: file, postData: postData},
        });    
    return file.upload
  };


  return {
    setPost: setPost,
    signOut: signOut,
    postToPage: postToPage
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
