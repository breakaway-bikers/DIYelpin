angular.module('yelpin.viewPost', ['yelpin.services'])

.controller('viewPostController', ['$scope', 'ViewPost','sharedPropertyService','$state', '$stateParams',  function($scope, ViewPost, sharedPropertyService, $state, $stateParams) {
  $scope.receivedData = 'Fetching Data';

console.log($stateParams._id);
  $scope.fetchPost = function() {
    ViewPost.getSinglePost($stateParams._id).then(function(data){
      console.log("::::::", data);
      $scope.receivedData = data[0];
    })
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

