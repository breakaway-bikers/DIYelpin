angular.module('yelpin.viewPost', [])

.controller('viewPostController', ['$scope', 'ViewPost', function($scope, ViewPost) {
  $scope.receivedData = 'Fetching Data';

  $scope.fetchPost = function() {
    $scope.receivedData = ViewPost.get();
    console.log($scope.receivedData)
  };

  $scope.fetchPost();
}]);
