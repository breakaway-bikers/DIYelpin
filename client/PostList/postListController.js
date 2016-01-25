angular.module('yelpin.postList', [])

.controller('postListController', ['$scope', '$http', 'ViewPost', 'appFactory','$state','sharedPropertyService', function($scope, $http, ViewPost, appFactory, $state, sharedPropertyService) {
  $scope.fetchedPosts = 'Currently fetching posts';

  $scope.checkAuth = function() {
    var check = sharedPropertyService.getProperty();
    console.log('check auth', check);
    if (check === 'name') {
      $state.go('signin');
    }
  };

  $scope.fetchPost = function() {
    return $http.get('/postList').then(function(res) {
      console.log(res.data, res.body);
      $scope.fetchedPosts = res.data;
    });
  };

  //Made this function for future use
  $scope.viewPost = function(postData) {
    ViewPost.set(postData);
  };

  $scope.signOut = function() {
    $scope.username = null;
    appFactory.signOut();
  };
  $scope.checkAuth();
  $scope.fetchPost();

}]);
