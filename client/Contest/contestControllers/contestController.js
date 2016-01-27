angular.module('yelpin.contest', [])

.controller('contestController',
  ['$scope',
   'ViewPost',
   '$http',
   'sharedPropertyService',
   '$state',
   function($scope, ViewPost, $http, sharedPropertyService, $state) {

     $scope.ingredients = {
      1: 'Mustard Greens', 2: 'Collard Greens',
      3: 'Dandelion Greens', 4: 'Kumquats',
      5: 'Quail', 6: 'Black Garlic',
      7: 'Tomatillos', 8: 'Rhubarb',
      9: 'Baby Fennel', 10: 'Cactus Pears',
      11: 'Zucchini', 12: 'Strawberries',
      13: 'Avocados', 14: 'Escarole',
      15: 'Duck Breast', 16: 'Rainbow Chard',
      17: 'Jicama', 18: 'Blueberries',
      19: 'Pineapple', 20: 'Mussels',
      21: 'Corn', 22: 'Lime',
      23: 'Carrots', 24: 'Celery',
      25: 'Spinach', 26: 'Onion',
      27: 'Rice', 28: 'Raspberries',
      29: 'Endive', 30: 'Scallions',
      31: 'Peas', 32: 'Chili Peppers',
      33: 'Coffee', 34: 'Muskmelon',
      35: 'Grapes', 36: 'Peaches',
      37: 'Mango', 38: 'Hazelnuts',
      39: 'Green Bell Peppers',
    };

     $scope.dailyIngredients = [];
     $scope.populateDaily = function() {
      for (var i = 0; i < 5; i++) {

        //generate random number
        var random = Math.floor(Math.random() * 39) + 1;
        var ingredient = $scope.ingredients[random];
        var duplicate = false;

        //search dailyIngredients for the current ingredient
        for (var j = 0; j < $scope.dailyIngredients.length; j++) {
          var daily = $scope.dailyIngredients[j];
          if (ingredient === daily) {
            duplicate = true;
          }
        }

        //if ingredient was already selected
        if (duplicate) {
          //run current loop iteration again
          i -= 1;
          continue;
        } else if (!duplicate) {
          //otherwise push to dailyIngredients
          $scope.dailyIngredients.push(ingredient);
        }
      }

    };

   $scope.populateDaily();

   $scope.receivedData = 'Fetching Data';

   $scope.fetchedPosts = 'Currently fetching posts';

   $scope.fetchPost = function() {
    return $http.get('/postList').then(function(res) {
      $scope.fetchedPosts = res.data;
    });
  };

    sharedPropertyService.checkAuth();
    $scope.fetchPost();

}])
