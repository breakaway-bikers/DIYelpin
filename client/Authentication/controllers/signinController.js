angular.module('yelpin.signin', [])

.controller('signinController', ['$scope', '$http', '$location', '$window','sharedPropertyService', 
  function($scope, $http, $location, $window, sharedPropertyService) {
  $scope.signinError = false;

  $scope.logout = function() {
    sharedPropertyService.destoryProperty();
    $location.path('/signin');
  };

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

  $scope.googleLogin = function() {
    return $http.get('/googleLogin').then(function(response) {
      console.log(response);
      return response.data;
    })
  }

  $scope.check = function() {
    
    var id = $window.localStorage.getItem('com.diy');
    var userID;
    
    if (!id) {
      $scope.googleLogin().then(function(response) {
        console.log(response);
        userID = response;
        $window.localStorage.setItem('com.diy', userID);
      });
    }
  };

  $scope.check();

}]);
