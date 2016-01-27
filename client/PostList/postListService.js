angular.module('postListService',[])

.factory('postListFactory', ['$http', function($http){
  var getAll = function (){
    return $http.get('/postList').then(function(res) {
      console.log(res.data, res.body);
      return res.data;
    });
  }

  var updateVotedPost = function (data) {
    return $http.post('/vote', data).then(function(res){
      return res.data;
    });
  }


  return{
    getAll: getAll,
    updateVotedPost: updateVotedPost
  }
}])
