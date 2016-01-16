angular.module('yelpin', ['ui.router', 'yelpin.postList'])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('signin', {
      templateUrl: 'signin.html',
      url: '/signin',
      controller: 'signinController',
    })
    .state('signup', {
      templateUrl: 'signup.html',
      url: '/signup',
      controller: 'signUpController',
    })
    .state('createPost', {
      templateUrl: 'createPost.html',
      url: '/createPost',
      controller: 'createPostController',
    })
    .state('postList', {
      templateUrl: 'Views/postList.html',
      url: '/postList',
      controller: 'postListController',
    });

  $urlRouterProvider.otherwise('/postList');

});
