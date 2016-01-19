angular.module('yelpin.signup', [])

.controller('signupController', ['$scope', '$http', '$location', function($scope, $http, $location) {
  $scope.signup = function(user) {
    console.log('signUPUPUP user: ', user);
    return $http.post('/createUser', user)
                .success(function(data, status) {
      console.log('user post success', data, status);
      $location.path('/signin');
    });
  };

}]);
