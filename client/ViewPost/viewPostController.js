angular.module('yelpin.viewPost', ['yelpin.services'])

.controller('viewPostController', ['$scope', 'ViewPost','sharedPropertyService','$state', '$stateParams',  function($scope, ViewPost, sharedPropertyService, $state, $stateParams) {
  $scope.receivedData = 'Fetching Data';

console.log($stateParams._id);
  $scope.fetchPost = function() {
    ViewPost.getSinglePost($stateParams._id).then(function(data){
      console.log("::::::", data);
      $scope.receivedData = data[0];
    })
    console.log($scope.receivedData);
  };

  sharedPropertyService.checkAuth();
  $scope.fetchPost();
}]);
