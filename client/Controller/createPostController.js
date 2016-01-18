angular.module('yelpin.createPost', ['yelpin.services']);

.controller('createPostController', ['$scope', 'appFactory', function($scope, appFactory) {
  //this should be set when user is signed in.
  $scope.username = '';

  //not sure if this is necessary if we are storing info in the database
  $scope.comment = [];
  $scope.txtcomment ='';

  $scope.postToPage = function($scope){
    if($scope.txtcomment !=''){
      $scope.comment.push($scope.txtcomment);
      $scope.txtcomment = "";
    }
    //this might need work. I'm attempting to send the information to the server using the factory function
    var data = { message: $scope.txtcomment };
      appFactory.setPost().then(function(data) {
    });
  };

//using angular file uploader..research more
var uploader = new FileUploader({
  filters: [{
  name: 'yourName1',
  // A user-defined filter
    fn: function(item) {
      return true;
    }
  }]
});

//more angular file uploader
//Another user-defined filter
uploader.filters.push({
  name: 'yourName2',
    fn: function(item) {
      return true;
    }
  });

  };
}]);