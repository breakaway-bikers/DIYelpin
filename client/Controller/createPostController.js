angular.module('yelpin.createPost', ['yelpin.services']);

.controller('createPostController', ['$scope', 'appFactory', function($scope, appFactory) {
  $scope.username = '';
  $scope.message = '';

  $scope.postToPage = function(){
    var data = { message: $scope.message };
    appFactory.setPost().then(function(data) {
      
    });
  };

  };
}]);
