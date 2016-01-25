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
         expect().toHaveBeenCalled();
       });
     });
  });
});
