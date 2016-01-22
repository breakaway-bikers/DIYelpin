describe('YELPIN', function() {
  beforeEach(module('yelpin'));

  var $controller, user, $scope, $http, $location, $q, deferred, $httpBackend, createController;
  beforeEach(inject(function(_$controller_, _$rootScope_, _$q_, _$httpBackend_) {
    $controller = _$controller_;
    $scope = _$rootScope_;
    $httpBackend = _$httpBackend_;
    var serveFakeFiles = $httpBackend.when('GET', 'Authentication/views/signin.html')
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

    it('$scope.signup should be a function', function() {
      var controller = createController();
      $httpBackend.flush();
      expect($scope.signup).toEqual(jasmine.any(Function));
    });

    it('should change $scope.user to null after catching an error', function() {
      $httpBackend.expectPOST('/createUser', user).respond(401, user);
      var controller = createController();
      $scope.signup(user);
      $httpBackend.flush();

      expect($scope.user).toEqual(null);
    });
  });

  // postList Controller
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

    xit('should set fetchPostError to true if an error is caught', function() {
      $httpBackend.expectGET('/postList').respond(200);
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

  describe('createPostController', function() {
    var createController = function() {
       return $controller('createPostController', { $scope: $scope });
     };

     it('$scope.postToPage should be a function', function() {
       var controller = createController();
       $httpBackend.flush();
       expect($scope.postToPage).toEqual(jasmine.any(Function));
     });
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
       xit ('postToPage should call setPost', function() {
         spyOn(factory, 'setPost');
         $httpBackend.expectPOST('/createPost').respond(200, {});
         var controller = createController();
         $scope.postToPage();
         $httpBackend.flush();
         expect(factory.setPost).toHaveBeenCalled();
       });

      //  it('$scope.postToPage should be a function', function() {
      //    spyOn(appFactory, 'setPost')
      //    $httpBackend.expectPOST('/createPost').respond(200);
      //    var controller = createController();
      //    $scope.postToPage();
      //    $httpBackend.flush();
      //    expect(appFactory.setPost).toHaveBeenCalled();
      //  });
     })
   });
});
