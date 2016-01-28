angular.module('yelpin.createPost', [])

.controller('createPostController', ['$scope', 'appFactory', 'sharedPropertyService', '$state', 'Upload', '$timeout', function($scope, appFactory, sharedPropertyService, $state, Upload, $timeout) {
  $scope.descript = '';
  $scope.txtcomment = '';
  $scope.category = '';
  $scope.customCategory = '';
  $scope.showCustomCategoryField = false;
  var temp = sharedPropertyService.getProperty();
  console.log('this is the set property', temp);

 // Check the drop down value of Categories then show/hide custom category
   $scope.checkDropDown = function(){
    if ($scope.category === "Custom"){
      $scope.showCustomCategoryField = true;
    } else {
      $scope.showCustomCategoryField = false;
    }
   }

  $scope.username = temp;
  $scope.comment = [];

  $scope.checkAuth = function() {
    var check = sharedPropertyService.getProperty();
    console.log('check auth', check);
    if (check === 'name') {
      $state.go('signin');
    }
  };
  $scope.postToPage = function() {
    console.log('this inside of post', $scope.username);
    if ($scope.txtcomment != '') {
      console.log($scope.txtcomment);
      console.log($scope.descript);
      $scope.comment.push($scope.txtcomment);
    }

    var data = { username: $scope.username, title: $scope.descript, message: $scope.txtcomment, category: $scope.category };
    if ($scope.category === "Custom") {
      data.category = $scope.customCategory;
    }
    console.log(" here;s the data object: ", data);

    appFactory.setPost(data);
    $scope.txtcomment = '';
    $scope.descript = '';
    $scope.category = '';
  };

  //This appears to retrieve the photo. But I cant find a way to then store this image in my mongo DB or whether it is being posted to an external server.

  //  *********************************************
  // CONTINUING JUAN'S UPLOAD FEATURE

  function _arrayBufferToBase64( buffer ) {
    var binary = '';
    var bytes = new Uint8Array( buffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa( binary );
}

  $scope.uploadFiles = function(file, errFiles) {
    $scope.f = file;
    $scope.errFile = errFiles && errFiles[0];
    console.log("the file is: ", file);
    if (file) {
      file.upload = Upload.upload({
        url: '/images',
        data: { file: file },
      });
      console.log("file.upload is: ", file.upload);
      file.upload.then(function(response) {
        console.log("response from the upload request: ", response);
        console.log("the actual data array", response.data.img.data.data);

        var dataNow64bit = _arrayBufferToBase64(response.data.img.data.data);
        // $scope.image = response.data.img.data.data;
        $scope.image = dataNow64bit;
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
  //  ***************************************


  $scope.checkAuth();
}]);
