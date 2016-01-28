angular.module('yelpin.postList', ['postListService'])


.controller('postListController', ['$scope', '$http', 'ViewPost', 'appFactory','$state','sharedPropertyService','postListFactory', '$timeout',
 function($scope, $http, ViewPost, appFactory, $state, sharedPropertyService, postListFactory, $timeout) {
  $scope.fetchedPosts;
  var currentUser = sharedPropertyService.getProperty();
  var userVotes = {};


  $scope.increment = function(item){
    postListFactory.increment(item, currentUser);
  };

  //Made this function for future use
  $scope.viewPost = function(postData) {
    ViewPost.set(postData);
  };

  $scope.signOut = function() {
    $scope.username = null;
    appFactory.signOut();
  };

  sharedPropertyService.checkAuth();
  postListFactory.fetchAndUpdateVotes(currentUser,function(data){
    $scope.fetchedPosts = data;
  });

}]);
