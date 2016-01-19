angular.module('yelpin.signin', [])

.controller('signinController', ['$scope', '$http', '$location', function($scope, $http, $location) {

  $scope.signin = function(user) {
    console.log('signINININ user: ', user);
    return $http.post('/authenticate', user).then(function(data, status) {
      console.log('user get success', data, status);
      if (data.data.length) {
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
