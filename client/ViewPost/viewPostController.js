angular.module('yelpin.viewPost', [])


.controller('viewPostController', ['$scope', 'ViewPost','sharedPropertyService','$state', function($scope, ViewPost, sharedPropertyService, $state) {
  $scope.receivedData = 'Fetching Data';

  $scope.fetchPost = function() {
    $scope.receivedData = ViewPost.get();
    console.log($scope.receivedData);
  };

  sharedPropertyService.checkAuth();
  $scope.fetchPost();
}])


.directive('markdown', function($window) {
  var converter = new showdown.Converter();
  return {
    restrict: 'E',
    scope: true,
    link: function(scope, element, attrs) {
      console.log('[' + element.text() +']');
      console.log('received data',scope.$parent.receivedData);
      if(scope.$parent.receivedData.message){
        var htmlText = converter.makeHtml(scope.receivedData.message);
        element.html(htmlText);
      }else{
        element.html('[no message]');
      }
    }
  }
})

