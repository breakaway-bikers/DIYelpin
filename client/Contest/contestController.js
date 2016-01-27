angular.module('yelpin.contest', [])

.controller('contestController',
  ['$scope',
   'ViewPost',
   '$http',
   'sharedPropertyService',
   '$state',
   function($scope, ViewPost, $http, sharedPropertyService, $state) {

    $scope.customFilter = function(item,i){
      if(item.category === 'contest'){
        if(item.date && item.date.toDateString() === new Date().toDateString()){
          return true;
        }
      }
      return false;
    }

    $scope.fetchPost = function() {
      return $http.get('/postList').then(function(res) {
        $scope.fetchedPosts = res.data;
      });
    };

    $scope.fetchContests = function() {
      console.log('fetching contests');
      return $http.get('/contest').then(function success(res) {
        $scope.dailyIngredients = res.data[res.data.length-1].ingredients;
        console.log('here are the contests', res.data);
      },function error(res){
        console.log('shit broke', res);
      });
    };

    sharedPropertyService.checkAuth();
    $scope.fetchPost();
    $scope.fetchContests();
  }
  ]);