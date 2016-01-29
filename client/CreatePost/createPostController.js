angular.module('yelpin.createPost', [])

.controller('createPostController', ['$scope', 'appFactory', 'sharedPropertyService', '$state', '$timeout', function($scope, appFactory, sharedPropertyService, $state, $timeout) {
  $scope.descript = '';
  $scope.txtcomment = '';
  $scope.category = '';
  $scope.customCategory = '';
  $scope.showCustomCategoryField = false;
  var temp = sharedPropertyService.getProperty();
  // console.log('this is the set property', temp);

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

    // Capture the data object 
    $scope.postData = data;


    // If an image file was chosen, use angular Upload (ng-file-upload) to send the data and the file
    if ($scope.f){
      file = $scope.f;
      appFactory.postToPage(file, $scope.postData).then(function(response) {
          // console.log("response from the upload request: ", response);
          // console.log("the actual data array", response.data.img.data.data);
          // var dataNow64bit = _arrayBufferToBase64(response.data.img.data.data);
          // $scope.image = response.data.img.data.data;
          // $scope.image = dataNow64bit;
          $timeout(function() {
            file.result = response.data;
          });
        })
    } else {  // No image file submitted, use the http post 
      appFactory.setPost(data);
    }

    $scope.txtcomment = '';
    $scope.descript = '';
    $scope.category = '';
  };


  //  *********************************************
  //  No longer used.  Keep in case we want to display the image on the create post page
  //   function _arrayBufferToBase64( buffer ) {
  //     var binary = '';
  //     var bytes = new Uint8Array( buffer );
  //     var len = bytes.byteLength;
  //     for (var i = 0; i < len; i++) {
  //         binary += String.fromCharCode( bytes[ i ] );
  //     }
  //     return window.btoa( binary );
  // }

  $scope.uploadFiles = function(file, errFiles) {
    $scope.f = file;
    $scope.errFile = errFiles && errFiles[0];
    // console.log("the file is: ", file);
  };
  //  ***************************************


  $scope.checkAuth();
}]);
