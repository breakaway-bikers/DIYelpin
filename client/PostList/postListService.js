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


function _arrayBufferToBase64( buffer ) {
    var binary = '';
    var bytes = new Uint8Array( buffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa( binary );
}

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
          // change the images to base64
          _.each(data, function(post){
            // console.log("here is the post: ", post);
            if (post.image[0]){
              post.imagelink =  "data:image/jpg;base64," + _arrayBufferToBase64(post.image[0].img.data.data);
              // console.log(post.image);
            } 
            // if (post.image[0])
            //   console.log ("Here is the image buffer", post.image[0].img.data.data)
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
