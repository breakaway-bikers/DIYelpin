angular.module('yelpin.postList', [])

.controller('postListController', ['$scope', '$http', function($scope, $http) {
  $scope.tests = 'testing!';

  $scope.fetchPost = function() {
    return $http.get('/postList').then(function(res) {
      console.log(res.data, res.body);
      $scope.tests = res.data;
    });
  };

  $scope.fetchPost();

}]);
