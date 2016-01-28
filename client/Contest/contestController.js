angular.module('yelpin.contest', ['postListService'])

.filter('niceDate', function() {
  return function(input) {
    if(!input){
      return "none";
    }else{
      return moment(input).format("MMM D, YYYY");
    }
  };
})

.controller('contestController',
  ['$scope',
   'ViewPost',
   '$http',
   'sharedPropertyService',
   '$state',
   'postListFactory',
   function($scope, ViewPost, $http, sharedPropertyService, $state, postListFactory) {
    
    var currentUser = sharedPropertyService.getProperty();

    $scope.customFilter = function(item,i){
      if(item.category === 'contest'){
        if(item.date && new Date($scope.selectedContest.date).toDateString() === new Date(item.date).toDateString()){
          return true;
        }
      }
      return false;
    }

    $scope.changeContest = function(contest){
      console.log('selected', $scope.selectedContest);
      $scope.dailyIngredients = $scope.selectedContest.ingredients;
    };

    $scope.fetchContests = function() {
      console.log('fetching contests');
      return $http.get('/contest').then(function success(res) {
        $scope.allContests = res.data;
        $scope.dailyIngredients = res.data[res.data.length-1].ingredients;
        $scope.selectedContest = res.data[res.data.length-1];

        console.log('here are the contests', res.data);
      },function error(res){
        console.log('shit broke', res);
      });
    };

    $scope.increment = function(item){
      postListFactory.increment(item, currentUser);
    };
    //Made this function for future use
    $scope.viewPost = function(postData) {
      ViewPost.set(postData);
    };

    sharedPropertyService.checkAuth();
    
    postListFactory.fetchAndUpdateVotes(currentUser,function(data){
      $scope.fetchedPosts = data;
    });

    $scope.fetchContests();
  }
  ]);