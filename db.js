var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/yelpin'); //this needs to change

var db = mongoose.connection;

var User;
var exports = module.exports;

db.on('error', console.error.bind(console, 'connection error'));

db.once('open', function() {
  console.log('were connected');
});

var UserSchema = mongoose.Schema({
  name: String,
  password: String,
});

var PostSchema = mongoose.Schema({
  username: String,
  title: String,
  message: String,
  votes: Number,
});

var User = mongoose.model('User', UserSchema);
var Post = mongoose.model('Post', PostSchema);

exports.createUser = function(obj) {
  var user = new User(obj);
  user.save(function(err, user) {
    if (err) {
      console.error('error in create user method');
    };
  });
};

exports.createPost = function(obj) {
  var post = new Post(obj);
  post.save(function(err, post) {
    if (err) {
      console.error('error in creating the post');
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
