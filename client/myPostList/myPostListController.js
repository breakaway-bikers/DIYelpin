angular.module('yelpin.myPostList', [])

.controller('myPostListController', ['$scope', '$http', 'ViewPost', 'appFactory','$state','sharedPropertyService', function($scope, $http, ViewPost, appFactory, $state, sharedPropertyService) {
  $scope.fetchedPosts = 'Currently fetching posts';
  $scope.updateMessage = false;

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
      //filter posts based on user
      $scope.fetchedPosts = _.filter(res.data,function(post){
        return post.username === sharedPropertyService.getProperty();
      });
    });
  };

  $scope.updatePost = function(item){
    console.log('updating',item);
    $scope.editMessageShow = true;
    $scope.updateMessage = "Updating...";

    return $http({
      url:'/viewPost',
      method:'PUT',
      data: item
    }).then(function(res){
      //indicate to interface that it was saved
      if(res.status <300){
        $scope.updateMessage = "Updated!";
        $timeout(function(){
            $scope.editMessageShow = false;
        },2000);
      }else{
        //failed
        $scope.updateMessage = "Update Failed!";
        console.log('Update failed, no response from the server',res)
      }
    }, function fail(res){
      console.log('Update failed, no response from the server',res)
    });
  }

  $scope.deletePost = function(item){

    if(!confirm("Are you sure you want to delete this post?")){
      return;
    }

    console.log('deleting',item);
    $scope.editMessageShow = true;
    $scope.updateMessage = "Deleting...";
    return $http({
      url:'/viewPost',
      method:'DELETE',
      data: item
    }).then(function success(res){
      //remove the item from $scope.fetchedPosts
      if(res.status <300){
        console.log('delete succeeded',res)
        //succeeded
        $scope.fetchedPosts = _.reject($scope.fetchedPosts,function(post){
          return post === item;
        });
      }else{
        //failed
        $scope.editMessageShow = true;
        $scope.updateMessage = "Delete Failed!";
        console.log('Update failed, no response from the server',res)
      }
    }, function fail(res){
      console.log('Update failed, no response from the server',res)
    });
  }

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
