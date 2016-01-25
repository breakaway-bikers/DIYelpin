angular.module('yelpin.viewPost', [])

.controller('viewPostController', ['$scope', 'ViewPost','sharedPropertyService','$state', function($scope, ViewPost, sharedPropertyService, $state) {
  $scope.receivedData = 'Fetching Data';

  $scope.fetchPost = function() {
    $scope.receivedData = ViewPost.get();
    console.log($scope.receivedData);
  };

  $scope.checkAuth = function() {
    var check = sharedPropertyService.getProperty();
    console.log('check auth', check);
    if (check === 'name') {
      $state.go('signin');
    }
  };

  $scope.checkAuth();
  $scope.fetchPost();
}]);
