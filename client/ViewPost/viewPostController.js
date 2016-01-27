angular.module('yelpin.viewPost', [])

.controller('viewPostController', ['$scope', 'ViewPost','sharedPropertyService','$state', function($scope, ViewPost, sharedPropertyService, $state) {
  $scope.receivedData = 'Fetching Data';

  $scope.fetchPost = function() {
    $scope.receivedData = ViewPost.get();
    console.log($scope.receivedData);
  };

  sharedPropertyService.checkAuth();
  $scope.fetchPost();
}]);
