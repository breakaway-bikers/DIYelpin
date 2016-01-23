angular.module('yelpin.signin', [])

.controller('signinController', ['$scope', '$http', '$location', function($scope, $http, $location) {
  $scope.signinError = false;

  $scope.signin = function(user) {
    console.log('POST TO /AUTHENTICATE: ', user);
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
