angular.module('yelpin.factory', [])

.factory('appFactory', ['$http', function($http) {

  var setPost = function(message) {
    console.log('SETPOST SETPOST')
    //I've got to fix this pathway
    return $http.post('/createPost', message)
    .then(function(data, status) {
      console.log('heres the data and status: ', data, data.status);
      
      if (data.status === 200) {
        console.log('post success');
        return data;
      } else {
        //Sign in Error message not working
      }
    }).catch(function(err) {
      console.log('post error', err);
      return err;
      // $scope.signinError = true;
    });
  };

  return {
    setPost: setPost,
  };
}]);
