angular.module('yelpin.signin', [])

.controller('signinController', ['$scope', '$http', '$location', 'sharedPropertyService', function($scope, $http, $location, sharedPropertyService) {
  $scope.signinError = false;
  
  $scope.practice = function(){
    console.log('we now have access to a controller inside index');
  };

  $scope.practice();

  $scope.signin = function(user) {
    console.log('POST TO /AUTHENTICATE: ', user);
    console.log('setting property', user.username);
    sharedPropertyService.setProperty(user.username);


    return $http.post('/authenticate', user)
      .then(function(data, status) {
        console.log('heres the data and status', data);
        $scope.user = data.data;
        if (data.status === 200) {
          $location.path('/postList');
        } else {
          //Sign in Error message not working
        }
      }).catch(function(err) {
        $scope.signinError = true;
      });
  };
}]);
