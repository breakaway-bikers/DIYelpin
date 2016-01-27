angular.module('yelpin.postList', ['postListService'])

.controller('postListController', ['$scope', 'ViewPost', 'appFactory','$state','sharedPropertyService', 'postListFactory',
function($scope, ViewPost, appFactory, $state, sharedPropertyService, postListFactory) {
  $scope.fetchedPosts = 'Currently fetching posts';

  $scope.checkAuth = function() {
    var check = sharedPropertyService.getProperty();
    console.log('check auth', check);
    if (check === 'name') {
      $state.go('signin');
    }
  };
  sharedPropertyService.setProperty('blaine')

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
    .then(function(){
      item.highlight = !item.highlight;
      console.log("might have worked");
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
  // $scope.checkAuth();
  $scope.fetchPost();

}]);
