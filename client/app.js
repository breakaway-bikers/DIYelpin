angular.module('yelpin', ['ui.router', 'yelpin.postList', 'yelpin.signin', 'yelpin.signup'])

.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/postList');

  $stateProvider
    .state('signin', {
      templateUrl: 'Views/signin.html',
      url: '/signin',
      controller: 'signinController',
    })
    .state('signup', {
      templateUrl: 'Views/signup.html',
      url: '/signup',
      controller: 'signupController',
    })
    .state('createPost', {
      templateUrl: 'Views/createPost.html',
      url: '/createPost',
      controller: 'createPostController',
    })
    .state('postList', {
      templateUrl: 'Views/postList.html',
      url: '/postList',
      controller: 'postListController',
    });

});
