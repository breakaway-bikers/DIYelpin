angular.module('yelpin.signup', [])

.controller('signupController', ['$scope', '$http', '$location', function($scope, $http, $location) {
  $scope.signup = function(user) {
    console.log('post to /createUser : ', user);
    return $http.post('/createUser', user)

      .then(function(data) {
        // $scope.user = data.data;
        console.log('user post success', data.status);
        if (data.status === 200) {
          $location.path('/signin');
        }
    })

      .catch(function(err) {
        $scope.user = null;
        console.log('Invalid Input', err);
    });
  };

}]);
