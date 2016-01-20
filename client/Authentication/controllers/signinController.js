angular.module('yelpin.signin', [])

.controller('signinController', ['$scope', '$http', '$location', function($scope, $http, $location) {
  $scope.signinError = false;

  $scope.signin = function(user) {
    console.log('POST TO /AUTHENTICATE: ', user);
    return $http.post('/authenticate', user).then(function(data, status) {
      console.log('heres the data and status', data);
      if (data.status === 200) {
        console.log('going off')
        $location.path('/postList');
      } else if (data.status === 401) {
        $scope.signinError = true;
      }
    });
  };
}]);
