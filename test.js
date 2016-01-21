describe('controllers', function(){

  beforeEach(module('yelpin'));

    var $controller, user, $scope, $http, $location, $q, deferred, $httpBackend, createController;

    beforeEach(inject(function(_$controller_, _$rootScope_, _$q_, _$httpBackend_){
      // The injector unwraps the underscores (_) from around the parameter names when matching
      $controller = _$controller_;
      $scope = _$rootScope_;
      $httpBackend = _$httpBackend_;
      // authRequestHandler = $httpBackend.when('POST', '/createUser')
      //                         .respond({ name: 'raph' }, { password: 'raph' });
      var serveFakeFiles = $httpBackend.when('GET', 'Authentication/views/signin.html')
                              .respond();

      user = {username:'raphael', password:'shoes'};

      // deferred = $q();
      }));

    afterEach(function() {
       $httpBackend.verifyNoOutstandingExpectation();
       $httpBackend.verifyNoOutstandingRequest();
     });

  describe('signinController', function(){

    var createController = function() {
      return $controller('signinController', { $scope: $scope });
    };
    
    it('should be a function', function() {
      var controller = createController();
      $httpBackend.flush();
      expect($scope.signin).toEqual(jasmine.any(Function));
    });

    it('should catch errors', function() {
      $httpBackend.expectPOST('/authenticate', user).respond(401, user);
      var controller = createController()
      $scope.signin(user);
      $httpBackend.flush();

      expect($scope.signinError).toEqual(true);
    });

    it('should attach response data to scope.user', function() {

      $httpBackend.expectPOST('/authenticate', user).respond(201, user);
      var controller = createController();
      $scope.signin(user);
      $httpBackend.flush();
      // console.log($scope.user)
      expect($scope.user).toEqual(user);
    });


  
  });


  describe('signupController', function() {
    var createController = function() {
         return $controller('signupController', { $scope: $scope });
       };

    it('should be a function', function() {
      var controller = createController();
      $httpBackend.flush();
      expect($scope.signup).toEqual(jasmine.any(Function));
    });

    it('should catch errors', function() {
      $httpBackend.expectPOST('/createUser', user).respond(401, user);
      var controller = createController()
      $scope.signup(user);
      $httpBackend.flush();

      expect($scope.user).toEqual(null);
    });

    it('should attach response data to scope.user', function() {

      $httpBackend.expectPOST('/createUser', user).respond(201, user);
      var controller = createController();
      $scope.signup(user);
      $httpBackend.flush();
      console.log($scope.user)
      expect(2).toEqual(2);
    });




  });
});