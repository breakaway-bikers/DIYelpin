angular.module('yelpin.postList', ['postListService'])


.controller('postListController', ['$scope', '$http', 'ViewPost', 'appFactory','$state','sharedPropertyService', function($scope, $http, ViewPost, appFactory, $state, sharedPropertyService) {
  $scope.fetchedPosts;

  $scope.fetchPost = function() {
    postListFactory.getAll()
    .then(function(data){
      $scope.fetchedPosts = data;
    })
  };

  // $scope.item.highlight = false;
  $scope.increment = function(item) {
    // item.highlight = false;
    var currentUser = sharedPropertyService.getProperty();
    postListFactory.updateVotedPost({username: currentUser, _id: item._id})
    .then(function(data){
      item.highlight = !item.highlight;
      console.log("might have worked", data);
    })
  }


  //Made this function for future use
  $scope.viewPost = function(postData) {
    ViewPost.set(postData);
  };

  $scope.signOut = function() {
    $scope.username = null;
    appFactory.signOut();
  };
<<<<<<< HEAD
  // $scope.checkAuth();
=======

  sharedPropertyService.checkAuth();
>>>>>>> 9067b7ef62514af976ea088563b8dc8b3e98a1f9
  $scope.fetchPost();

}]);
