angular.module('yelpin.viewPost', ['yelpin.services'])

.controller('viewPostController', ['$scope', 'ViewPost','sharedPropertyService','$state', '$stateParams',  function($scope, ViewPost, sharedPropertyService, $state, $stateParams) {
  $scope.receivedData = 'Fetching Data';


// Function need to convert the buffer to  a base 64bit string
function _arrayBufferToBase64( buffer ) {
    var binary = '';
    var bytes = new Uint8Array( buffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa( binary );
}


console.log($stateParams._id);

  $scope.fetchPost = function() {
    ViewPost.getSinglePost($stateParams._id).then(function(data){
      console.log("::::::", data);
      $scope.receivedData = data[0];
      // set imagelink to be in the format base64 that is needed by <img ng-src="{{receivedData.imagelink}}"> in the viewPost.html file>
      console.log("here is the image[0] length: ", $scope.receivedData.image[0])
      if ($scope.receivedData.image.length){
        $scope.receivedData.imagelink = "data:image/jpg;base64," + _arrayBufferToBase64($scope.receivedData.image[0].img.data.data);
        // console.log ("\n\nThe data buffer: ", $scope.receivedData.image[0].img.data.data)
      }
    })
  };

  sharedPropertyService.checkAuth();
  $scope.fetchPost();
}])

.directive('markdown', function($window) {
  var converter = new showdown.Converter();
  return {
    restrict: 'E',
    link: function(scope, element, attrs) {
      var text;

      scope.$watch(function(){
        return element.html();
      },function(){

        text = element.html();
        var htmlText = converter.makeHtml(text);
        element.html(htmlText);
      });
    }
  }
})

