angular.module('yelpin.myPostList', [])

.controller('myPostListController', ['$scope', '$http', 'ViewPost', 'appFactory','$state','$timeout','sharedPropertyService', 'Upload', 
  function($scope, $http, ViewPost, appFactory, $state, $timeout, sharedPropertyService, Upload) {
  $scope.fetchedPosts;
  $scope.updateMessage = false;

  $scope.fetchPost = function() {
  
    var username = sharedPropertyService.getProperty()

    return $http.get('/myPosts/' + username)
    .then(function success(res) {
      console.log('here is the response',res)
      $scope.fetchedPosts = res.data;
    }, function fail(res){
      console.log('failed!',res);
    });
      
  };

  // Get the new image file
  $scope.uploadFiles = function(file, errFiles) {
    $scope.f = file;
    $scope.errFile = errFiles && errFiles[0];
    // console.log("the file is: ", file);
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
      url:'/post/' + item._id,
      method:'DELETE'
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

  $scope.signOut = function() {
    $scope.username = null;
    appFactory.signOut();
  };
  
  sharedPropertyService.checkAuth();
  $scope.fetchPost();

}]);
