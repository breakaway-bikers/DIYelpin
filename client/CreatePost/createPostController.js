angular.module('yelpin.createPost', ['ngFileUpload'])

.controller('createPostController', ['$scope', 'appFactory', 'sharedPropertyService', 'Upload', '$timeout', function($scope, appFactory, sharedPropertyService, Upload, $timeout) {
  $scope.descript = '';
  $scope.txtcomment = '';
  $scope.category = '';
  var temp = sharedPropertyService.getProperty();
  console.log('this is the set property', temp);

  $scope.username = temp;
  $scope.comment = [];

  $scope.postToPage = function() {
    console.log('this inside of post', $scope.username);
    if ($scope.txtcomment != '') {
      console.log($scope.txtcomment);
      console.log($scope.descript);
      $scope.comment.push($scope.txtcomment);
    }

    var data = { username: $scope.username, title: $scope.descript, message: $scope.txtcomment, category: $scope.category };
    console.log(data);
    appFactory.setPost(data);
    $scope.txtcomment = '';
    $scope.descript = '';
    $scope.category = '';
  };

  //This appears to retrieve the photo. But I cant find a way to then store this image in my mongo DB or whether it is being posted to an external server.

  $scope.uploadFiles = function(file, errFiles) {
    $scope.f = file;
    $scope.errFile = errFiles && errFiles[0];
    if (file) {
      file.upload = Upload.upload({
        url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
        data: { file: file },
      });
      console.log(file.upload);
      file.upload.then(function(response) {
        $timeout(function() {
          file.result = response.data;
        });
      },

      function(response) {
        if (response.status > 0)
          $scope.errorMsg = response.status + ': ' + response.data;
      },

      function(evt) {
        file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
      });
    }
  };

}]);
