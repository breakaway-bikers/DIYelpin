angular.module('yelpin.signup', [])

.controller('signupController', ['$scope', '$http', '$location', function($scope, $http, $location) {
  $scope.signup = function(user) {
    console.log('post to /createUser : ', user);
    return $http.post('/createUser', user)
                .then(function success(data, status) {
      console.log('user post success', data, status);
      $location.path('/signin');
    }, function error(){
      console.log('there was a problem with that username.');
    });
  };

}]);
