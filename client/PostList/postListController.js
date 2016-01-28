angular.module('yelpin.postList', ['postListService'])


.controller('postListController', ['$scope', '$http', 'ViewPost', 'appFactory','$state','sharedPropertyService','postListFactory', '$timeout',
 function($scope, $http, ViewPost, appFactory, $state, sharedPropertyService, postListFactory, $timeout) {
  $scope.fetchedPosts;
  var currentUser = sharedPropertyService.getProperty();
  var userVotes = {};

  $scope.fetchPost = function() {
    postListFactory.getAll()
    .then(function(data){
      postListFactory.getUserVotes({username: currentUser})
        .then(function(user){

          _.each(user.votedFor, function(id){
            userVotes[id] = id;
          });

          _.each(data, function(post){
            if (userVotes.hasOwnProperty(post._id)){
              post.highlight = true;
            }
          });
        })
      $scope.fetchedPosts = data;
      })
    };

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
  $scope.fetchPost();

}]);
