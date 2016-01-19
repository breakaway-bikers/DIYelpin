angular.module('yelpin.signin', [])

.controller('signinController', ['$scope', '$http', '$location', function($scope, $http, $location) {

  $scope.signin = function(user) {
    console.log('POST TO /AUTHENTICATE: ', user);
    return $http.post('/authenticate', user).then(function(data, status) {
      if (data.data.length) {
        console.log('RESPONSE FROM SERVER', data.data[0], status);
        if (data.data[0].username === 'admin') {
          $location.path('/admin');
        } else {
          console.log('logged in');
          user.auth = true;
          $location.path('/postList');
        }
      } else {
        console.log('not logged in');
      }
    });
  }
}]);
