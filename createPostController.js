angular.module('yelpin.createPost');

.controller('createPostController', ['$scope', '$http', function($scope, $http) {
  $scope.username = '';
  $scope.message = '';
}]);
