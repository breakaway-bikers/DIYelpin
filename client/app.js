angular.module('yelpin', ['infinite-scroll',
  'ui.router',
  'yelpin.postList',
  'yelpin.viewPost',
  'yelpin.services',
  'yelpin.signin',
  'yelpin.signup',
  'yelpin.createPost',
  'yelpin.factory',
  'yelpin.contest',
  'yelpin.myPostList',
  'ngFileUpload'
  ])


.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider
    .when('/?:params', function($stateParams){
      console.log("))))))))",$stateParams)
    })
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
    //added feature
    .state('myPostList', {
      templateUrl: 'myPostList/myPostList.html',
      url: '/myPostList',
      controller: 'myPostListController',
    })
    .state('viewPost', {
      templateUrl: 'ViewPost/viewPost.html',
      url: '/viewPost/{username}/{_id}',
      controller: 'viewPostController',
    })
    .state('contest', {
      templateUrl: 'Contest/contest.html',
      url: '/contest',
      controller: 'contestController',
    });

  $urlRouterProvider.otherwise('/signin');

});

// expose our config directly to our application using module.exports
