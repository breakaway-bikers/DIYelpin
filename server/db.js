var mongoose = require('mongoose');
var Bcrypt = require('bcrypt');
var Salt_Factor = 10;
var Q = require('q');
var mongoURI = 'mongodb://diyelpin:Beansandburrito1600@ds047335.mongolab.com:47335/heroku_ws06b5hx';

// mongo ds047335.mongolab.com:47335/heroku_ws06b5hx -u <diyelpin> -p <Beansandburrito1600>
// mongo ds047335.mongolab.com:47335/heroku_ws06b5hx -u diyelpin -p Beansandburrito1600

// mongoose.connect(process.env.MONGOLAB_URI || mongoURI);

mongoose.connect('mongodb://localhost/yelpin');

var db = mongoose.connection;

var User;
var exports = module.exports;

db.on('error', console.error.bind(console, 'connection error'));

db.once('open', function() {
  console.log('were connected');
});

var PostSchema = mongoose.Schema({
  username: String,
  category: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    index: { unique: true },
    required: true,
  },
  message: String,
  votes: { type: Number, default: 0 },
});

var UserSchema = mongoose.Schema({
  username: {
    type: String,
    index: { unique : true }
  },
  password: String,
  votedFor: []
});

var User = mongoose.model('User', UserSchema);
var Post = mongoose.model('Post', PostSchema);

exports.createUser = function(obj) {
  
  console.log("1. USERNAME", obj);
  if (!obj.password) {
    obj.password = '123';
  }
  
  var defer = Q.defer();

  Bcrypt.genSalt(Salt_Factor, function(err, salt) {
    if (err) {
      return console.error('error in genSalt ', err);
    }

    console.log('some salt here', salt);

    return Bcrypt.hash(obj.password, salt, function(err, hash) {
      if (err) {
        defer.resolve(false);
        return console.log('error in genhash ', err);
      }

      console.log('some hash here ', hash);
      obj.password = hash;
      console.log('password after hashing', obj.password);
      console.log("2. USERNAME", obj);
      var user = new User(obj);
      console.log("3. USER", user);
      user.save(function(err, user) {
        if (err) {
          console.log('\n\n\n------------------\nDB CREATEUSER ERROR', user);
          defer.resolve(false);
        } else {
          console.log('DB CREATE USER SUCCESS');
          defer.resolve(user);
        }
      });
    });
  });

  return defer.promise;
};

exports.findUser = function(obj) {
  console.log("------IN THE DB-------",obj);
  var defer = Q.defer();
  User.find({ username: obj.username }).then(function(user, err) {
    if (err) {
    } else {
      return Bcrypt.compare(obj.password, user[0].password, function(err, result) {
        if (err) {
          defer.reject(err);
        }
        if (result === false) {
          defer.resolve(result);
        } else {
          defer.resolve(user);
        }
      });
    }
  });

  return defer.promise;
};

exports.findGoogleUser = function(obj, callback) {

  if (!obj.password) {
    obj.password = '123';
  }

  console.log("------IN THE DB-------",obj);
  var defer = Q.defer();
  return User.find({ username: obj.username }, callback);
};

exports.createPost = function(obj) {
  var post = new Post(obj);
  console.log('heres the post', post);
  return post.save(function(err, post) {
    if (err) {
      console.error('error in creating the post', err);
    } else {
      return post;
    }
  });
};

exports.findAllPosts = function() {
  return Post.find({}, function(err, result) {
    if (err) {
      console.error('error in find all post');
    } else {
      return result;
    }
  });
};

// Voting
exports.vote = function(votedPost){
  return User.findOne({username: votedPost.username}, function(err, user){
    if (err) {
      console.error('error in find all post');
    } else {
      console.log("^^^^^^^^^^^",user);
    }
  }).then(function(user){
    console.log("^^^^^^^^^^^",user);

      for (var i = 0; i < user.votedFor.length; i++){
        console.log(user.votedFor[i]);
        console.log(votedPost._id);

        if (user.votedFor[i] === votedPost._id){
          console.log("Removing vote!!!");

          user.votedFor.splice(i, 1);

          console.log(">>>>>>>>>",user.votedFor)
          Post.findOne({_id: votedPost._id}, function(err, post){
            if (err) {
              console.error('found error');
            } else {
              post.votes--
              console.log("!!!!!!!!!!!",post)
              post.save(function(err){
                if(err) console.log(err);
              })
              return post;
            }
          })
          user.save();
          return user;
        }
      }

      user.votedFor.push(votedPost._id);
      user.save();

      console.log(">>>>>>>>>",user.votedFor)

      Post.findOne({_id: votedPost._id}, function(err, post){
        if (err) {
          console.error('found error');
        } else {
          post.votes++
          console.log("!!!!!!!!!!!",post)
          post.save()
          return post;
        }
      })
      return user;
  });
}


//Have not used this function yet
exports.viewPost = function(userObj) {
  console.log("Typeof of Username", userObj.username);
  return Post.find({ username: userObj.username }, function(err, result) {
    if (err) {
      console.error('error in the VIEW post method');
    } else {
      return result;
    }
  });
};


//Update a Post to the Database
exports.updatePost = function(updatedObj, callback) {

  // console.log(userObj.username);
  console.log("---------FROM THE DATABASE--------", updatedObj);
  return Post.findOneAndUpdate({ _id: updatedObj._id }, updatedObj, callback);

};

//Delete a Post from the Database
exports.deletePost = function(postObj) {
  console.log("Deleting a Post from the Database");
  return Post.remove({ _id: postObj._id }, function(err, result) {
    if (err) {
      console.error('error in the DELETE method');
    } else {
      return result;
    }
  });
};
