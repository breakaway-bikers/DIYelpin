angular.module('postListService',[])

.factory('postListFactory', ['$http', '$timeout', function($http, $timeout){

  var getAll = function (){
    return $http.get('/postList').then(function(res) {
      return res.data;
    });
  }

  var updateVotedPost = function (data) {
    return $http.post('/vote', data).then(function(res){
      return {status:res.status, data: res.data};
    });
  }


  var getUserVotes = function (data) {
    return $http.post('/user', data).then(function(res){
      return res.data;
    })
  }

  var buttonDisable = false;

  var increment = function(item, currentUser) {
    if (buttonDisable){
      console.log("click prevented");
      return;
    }
    buttonDisable = true;
    updateVotedPost({username: currentUser, _id: item._id})
    .then(function(data){
      item.highlight = !item.highlight;
      console.log("might have worked", data.status);
      if (data.status === 200){
        if (item.highlight){
          item.votes++;
        } else if (item.votes !== 0) {
          item.votes--;
        } else {
          item.highlight = false;
        }
        $timeout(function () {
          buttonDisable = false;
        }, 100);
      }
    });
  };

  var fetchAndUpdateVotes = function(currentUser,callback) {
    var userVotes = {};
    getAll().then(function(data){
      getUserVotes({username: currentUser})
        .then(function(user){

          _.each(user.votedFor, function(id){
            userVotes[id] = id;
          });

          _.each(data, function(post){
            if (userVotes.hasOwnProperty(post._id)){
              post.highlight = true;
            }
          });
      });
      return callback(data);
    });
  };

  return{
    increment: increment,
    fetchAndUpdateVotes: fetchAndUpdateVotes
  }
}])