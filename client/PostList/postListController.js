angular.module('yelpin.postList', ['postListService'])


.controller('postListController', ['$scope', '$http', 'ViewPost', 'appFactory','$state','sharedPropertyService','postListFactory', '$timeout',
 function($scope, $http, ViewPost, appFactory, $state, sharedPropertyService, postListFactory, $timeout) {
  
  $scope.fetchedPosts = [];
  $scope.uniqueCategories = [];
  $scope.sortType = "date";
  $scope.selectedCategory = "All";
  var currentUser = sharedPropertyService.getProperty();

  $scope.increment = function(item){
    postListFactory.increment(item, currentUser);
  };


  $scope.customFilter = function(item,i){
    if($scope.selectedCategory === 'All' ){
      return true;
    }

    if(item.category === $scope.selectedCategory){
      return true;
    }
    return false;
  };

  $scope.customOrder = function(post){
    if($scope.sortType === 'votes'){
      return -post[$scope.sortType];
    }else if($scope.sortType === 'date'){
      if(post[$scope.sortType] === "none"){
        return new Date("1-1-1970"); 

      }
      return new Date(post[$scope.sortType]);
    }
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
    $scope.uniqueCategories = _.chain(data).pluck('category').unique().value();
    $scope.uniqueCategories.unshift('All');

  });

}]);
