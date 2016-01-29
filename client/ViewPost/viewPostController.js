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

