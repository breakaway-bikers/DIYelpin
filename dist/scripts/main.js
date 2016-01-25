angular.module('yelpin', ['ui.router', 'yelpin.postList', 'yelpin.viewPost', 'yelpin.services', 'yelpin.signin', 'yelpin.signup', 'yelpin.createPost', 'yelpin.factory', 'yelpin.contest'])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('signin', {
      templateUrl: 'Authentication/views/signin.html',
      url: '/signin',
      controller: 'signinController',
    })
    .state('signup', {
      templateUrl: 'Authentication/views/signup.html',
      url: '/signup',
      controller: 'signupController',
    })
    .state('createPost', {
      templateUrl: 'CreatePost/createPost.html',
      url: '/createPost',
      controller: 'createPostController',
    })
    .state('postList', {
      templateUrl: 'PostList/postList.html',
      url: '/postList',
      controller: 'postListController',
    })
    .state('viewPost', {
      templateUrl: 'ViewPost/viewPost.html',
      url: '/viewPost',
      controller: 'viewPostController',
    })
    .state('contest', {
      templateUrl: 'Contest/contestViews/contest.html',
      url: '/contest',
      controller: 'contestController',
    });
  $urlRouterProvider.otherwise('/signin');

});

angular.module('yelpin.createPost', [])

.controller('createPostController', ['$scope', 'appFactory', function($scope, appFactory) {
  //console.log('getting into controller');
  //this should be set when user is signed in.
  $scope.username = '';
  $scope.descript = '';
  $scope.txtcomment = '';
  $scope.category = '';

  //not sure if this is necessary if we are storing info in the database
  $scope.comment = [];

  $scope.postToPage = function() {
    if ($scope.txtcomment != '') {
      console.log($scope.txtcomment);
      console.log($scope.descript);
      $scope.comment.push($scope.txtcomment);
    }

    //this might need work. I'm attempting to send the information to the server using the factory function
    var data = { title: $scope.descript, message: $scope.txtcomment, category: $scope.category };
    console.log(data);
    appFactory.setPost(data).then(function(data) {
      console.log(data);
    });

    $scope.txtcomment = '';
    $scope.descript = '';
    $scope.category = '';
  };

  // $scope.uploader = new FileUploader();

  //using angular file uploader..research more
  // var uploader = new FileUploader({
  //   filters: [{
  //   name: 'yourName1',
  //   // A user-defined filter
  //     fn: function(item) {
  //       return true;
  //     }
  //   }]
  // });

  //more angular file uploader
  //Another user-defined filter
  // uploader.filters.push({
  //   name: 'yourName2',
  //     fn: function(item) {
  //       return true;
  //     }
  //   });

}]);

angular.module('yelpin.factory', [])

.factory('appFactory', ['$http', function($http) {

  var setPost = function(message) {
    //I've got to fix this pathway

  };

  return {
    setPost: setPost,
  };
}]);

angular.module('yelpin.postList', [])

.controller('postListController', ['$scope', '$http', 'ViewPost', function($scope, $http, ViewPost) {
  $scope.fetchedPosts = 'Currently fetching posts';

  $scope.fetchPost = function() {
    return $http.get('/postList').then(function(res) {
      console.log(res.data, res.body);
      $scope.fetchedPosts = res.data;
    });
  };

  //Made this function for future use
  $scope.viewPost = function(postData) {
    ViewPost.set(postData);
  };

  $scope.fetchPost();

}]);

angular.module('yelpin.viewPost', [])

.controller('viewPostController', ['$scope', 'ViewPost', function($scope, ViewPost) {
  $scope.receivedData = 'Fetching Data';

  $scope.fetchPost = function() {
    $scope.receivedData = ViewPost.get();
    console.log($scope.receivedData);
  };

  $scope.fetchPost();
}]);

angular.module('yelpin.services', [])

.factory('ViewPost', function() {
  var savedData = {};

  var set = function(data) {
    savedData = data;
  };

  var get = function() {
    return savedData;
  };

  return {
    set: set,
    get: get,
  };
});


var request = require("request");

var base_url = "http://localhost:3000/"

describe("server.js", function() {

  describe("GET /", function() {
    xit("returns status code 200", function(done) {
      request.get(base_url).on('response', function(response) {
        console.log("test1", response.statusCode);
        expect(response.statusCode).toBe(200);
        done();
      });
    });
  });

  describe("GET /postList", function() {
    xit("returns status code 200", function(done) {
      request.get(base_url + "postList")
      .on('response', function(response) {
        console.log("test2", response.statusCode);
        expect(response.statusCode).toBe(200);
        done();
      });
    });
  });

  describe('POST /authenticate', function() {

    xit("returns status code 200 if user and password match", function(done) {
      request.post(base_url + "authenticate", { 'username': "raphael", 'password': "shoes" })
      .on('response', function(err, response, body) {
        console.log("test3", response);
        expect(response.statusCode).toBe(200);
        done();
      });
    });
    it('returns status code 200 if user and password match', function(done) {
      request({
        url: base_url + 'authenticate', //URL to hit
        qs: {username: 'raphael', password: 'shoes'}, //Query string data
        method: 'POST', //Specify the method
        headers: { //We can define headers too
          'Content-Type': 'application/json',
          // 'Custom-Header': 'Custom Value'
        },
        json: {username: 'raphael', password: 'shoes'}
      }, function(error, response, body) {
        if(error) {
          console.log(error);
        } else {
          console.log(response.statusCode, body);
          expect(response.statusCode).toBe(200);
          done();
        }
      });

    });
  });

});

describe('YELPIN', function() {
  beforeEach(module('yelpin'));

  var $controller, user, $scope, $http, $location, $q, deferred, $httpBackend, createController;

  beforeEach(inject(function(_$controller_, _$rootScope_, _$q_, _$httpBackend_, _$location_) {
    $controller = _$controller_;
    $scope = _$rootScope_;
    $httpBackend = _$httpBackend_;
    var serveFakeFiles = $httpBackend.when('GET', 'Authentication/views/signin.html')
    .respond();
    var serveFakeFiles2 = $httpBackend.when('GET', 'PostList/postList.html')
    .respond();
    user = { username: 'raphael', password: 'shoes' };
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  // SIGNIN CONTROLLER
  describe('signinController', function() {

    var createController = function() {
      return $controller('signinController', { $scope: $scope });
    };

    it('signin function exists', function() {
      var controller = createController();
      $httpBackend.flush();
      expect($scope.signin).toEqual(jasmine.any(Function));
    });

    it('should post the argument to /authenticate', function() {
      $httpBackend.expectPOST('/authenticate', user).respond(200, user);
      var controller = createController();
      $scope.signin(user);
      $httpBackend.flush();
    });

    it('should catch errors', function() {
      $httpBackend.expectPOST('/authenticate', user).respond(401, user);
      var controller = createController();
      $scope.signin(user);
      $httpBackend.flush();
      expect($scope.signinError).toEqual(true);
    });

    it('should attach response data to scope.user', function() {
      $httpBackend.expectPOST('/authenticate', user).respond(201, user);
      var controller = createController();
      $scope.signin(user);
      $httpBackend.flush();
      expect($scope.user).toEqual(user);
    });
  });

  // SIGNUP CONTROLLER
  describe('signupController', function() {
    var createController = function() {
      return $controller('signupController', { $scope: $scope });
    };

    beforeEach(inject(function(_$rootScope_, _$location_) {
      $rootScope = _$rootScope_,
      $location = _$location_;
    }));

    it('$scope.signup should be a function', function() {
      var controller = createController();
      $httpBackend.flush();
      expect($scope.signup).toEqual(jasmine.any(Function));
    });

    it('should set $scope.user to null on error', function() {
      $httpBackend.expectPOST('/createUser').respond(401, user);
      spyOn($location, 'path').and.returnValue('/');
      var controller = createController();
      $scope.signup(user);
      $httpBackend.flush();
      expect($scope.user).toEqual(null);

      // should be able to check with
      // expect($location.path).not.toHaveBeenCalled();
      // but I cant get it to work
    });

    it('should redirect to /signin', function() {
      $httpBackend.expectPOST('/createUser').respond(200, user);
      spyOn($location, 'path').and.returnValue('/');
      var controller = createController();
      $scope.signup();
      $httpBackend.flush();
      expect($location.path).toHaveBeenCalled();
    });

  });

  // POSTLIST CONTROLLER
  describe('postListController', function() {
    var createController = function() {
         return $controller('postListController', { $scope: $scope });
       };

    it('$scope.fetchPost should be a function', function() {
      $httpBackend.expectGET('/postList').respond(200);
      var controller = createController();
      $httpBackend.flush();
      expect($scope.fetchPost).toEqual(jasmine.any(Function));
    });

    it('$scope.viewPost should be a function', function() {
      $httpBackend.expectGET('/postList').respond(200);
      var controller = createController();
      $httpBackend.flush();
      expect($scope.viewPost).toEqual(jasmine.any(Function));
    });

    // TODO make this work.
    xit('should set fetchPostError to true if an error is caught', function() {
      $httpBackend.expectGET('/postList').respond(401);
      var controller = createController();
      $httpBackend.flush();
      expect($scope.fetchPostError).toEqual(true);
    });

    it('should attach an array of posts to $scope.fetchedPosts', function() {
      $httpBackend.expectGET('/postList').respond(200, [1, 2, 3]);
      var controller = createController();
      $httpBackend.flush();
      expect($scope.fetchedPosts.length).not.toBeUndefined();
    });
  });

  // CREATE POST CONTROLLER
  describe('createPostController', function() {
    var createController = function() {
       return $controller('createPostController', { $scope: $scope });
     };

    it('$scope.postToPage should be a function', function() {
      var controller = createController();
      $httpBackend.flush();
      expect($scope.postToPage).toEqual(jasmine.any(Function));
    });

    // FACTORY
    describe('createPost factories', function() {
       var factory = null;
       beforeEach(inject(function(appFactory) {
         factory = appFactory;
       }));

       it('appFactory.setPost should be a function', function() {
         var controller = createController();
         $httpBackend.flush();
         expect(factory.setPost).toEqual(jasmine.any(Function));
       });

       // TODO make this test pass.
       xit('postToPage should call setPost', function() {
         spyOn(factory, 'setPost');
         $httpBackend.expectPOST('/createPost').respond(200, {});
         var controller = createController();
         $scope.postToPage();
         $httpBackend.flush();
         expect(factory.setPost).toHaveBeenCalled();
       });
     });
  });
});

angular.module('yelpin.signin', [])

.controller('signinController', ['$scope', '$http', '$location', function($scope, $http, $location) {
  $scope.signinError = false;

  $scope.signin = function(user) {
    console.log('POST TO /AUTHENTICATE: ', user);
    return $http.post('/authenticate', user)
      .then(function(data, status) {
        console.log('heres the data and status', data);
        $scope.user = data.data;
        if (data.status === 200) {
          $location.path('/postList');
        } else {
          //Sign in Error message not working
        }
      }).catch(function(err) {
        $scope.signinError = true;
      });
  };
}]);

angular.module('yelpin.signup', [])

.controller('signupController', ['$scope', '$http', '$location', function($scope, $http, $location) {
  $scope.signup = function(user) {
    console.log('post to /createUser : ', user);
    return $http.post('/createUser', user)

      .then(function(data) {
        // $scope.user = data.data;
        console.log('user post success', data.status);
        if (data.status === 200) {
          $location.path('/signin');
        }
    })

      .catch(function(err) {
        $scope.user = null;
        console.log('Invalid Input', err);
    });
  };

}]);

angular.module('yelpin.contest', [])

.controller('contestController',
  ['$scope',
   'ViewPost',
   '$http',
   function($scope, ViewPost, $http) {

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
        console.log(res.data, res.body);
        $scope.fetchedPosts = res.data;
      });
    };

     $scope.fetchPost();

   },
]);
