angular.module('yelpin.createPost', [])

.controller('createPostController', ['$scope', 'appFactory', function($scope, appFactory) {
  //console.log('getting into controller');
  //this should be set when user is signed in.
  $scope.username = '';
  $scope.descript = '';
  $scope.txtcomment = '';

  //not sure if this is necessary if we are storing info in the database
  $scope.comment = [];

  $scope.postToPage = function() {
    if ($scope.txtcomment != '') {
      console.log($scope.txtcomment);
      console.log($scope.descript);
      $scope.comment.push($scope.txtcomment);
    }

    //this might need work. I'm attempting to send the information to the server using the factory function
    var data = { description: $scope.descript, message: $scope.txtcomment };
    console.log(data);
    appFactory.setPost().then(function(data) {
      console.log(data);
    });
    $scope.txtcomment = '';
    $scope.descript = '';
  };

  // $scope.uploader = new FileUploader();

  //using angular file uploader..research more
  // var uploader = new FileUploader({
  //   filters: [{
  //   name: 'yourName1',
  //   // A user-defined filter
  //     fn: function(item) {
  //       return true;
  //     }
  //   }]
  // });

  //more angular file uploader
  //Another user-defined filter
  // uploader.filters.push({
  //   name: 'yourName2',
  //     fn: function(item) {
  //       return true;
  //     }
  //   });

}]);
