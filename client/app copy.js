angular.module('yelpin', ['ui.router', 'yelpin.postList', 'yelpin.viewPost', 'yelpin.services', 'yelpin.signin', 'yelpin.signup', 'yelpin.createPost', 'yelpin.factory', 'yelpin.contest', 'ngFileUpload'])

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
