var mongoose = require('mongoose');
var Bcrypt = require('bcrypt');
var Salt_Factor = 10;

var mongoURI = 'mongodb://diyelpin:Beansandburrito1600@ds047335.mongolab.com:47335/heroku_ws06b5hx';
// mongoose.connect(process.env.MONGOLAB_URI || mongoURI);
mongoose.connect('mongodb://localhost/yelpin')

var db = mongoose.connection;

var User;
var exports = module.exports;

db.on('error', console.error.bind(console, 'connection error'));

db.once('open', function() {
  console.log('were connected');
});

var UserSchema = mongoose.Schema({
  username: {
    type: String,
    index: { unique: true },
  },
  password: String,
});

var PostSchema = mongoose.Schema({
  username: String,
  category: {
    type: String,
    index: { unique: true },
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

var User = mongoose.model('User', UserSchema);
var Post = mongoose.model('Post', PostSchema);

exports.createUser = function(obj) {
  console.log(obj.password);
  Bcrypt.genSalt(Salt_Factor, function(err, salt) {
    if (err) {
      return console.error('error in genSalt ', err);
    }

    console.log('some salt here', salt);

    Bcrypt.hash(obj.password, salt, function(err, hash) {
      if (err) {
        return console.err('error in genhash ', err);
      }

      console.log('some hash here ', hash);
      obj.password = hash;
      console.log('password after hashing', obj.password);
      var user = new User(obj);
      return user.save(function(err, user) {
        if (err) {
          console.error('error in create user method');
        } else {
          console.log('user password in database', user.password);
          return true;
        }
      });
    });
  });
};

exports.findUser = function(obj) {
<<<<<<< HEAD
  console.log('obj in db', obj);
  return User.find(obj, function(user, err) {
=======
  console.log('obj password in db', obj);

  return User.find({ username: obj.username }, function(err, user) {
>>>>>>> 5d0584bfcb467a79f978e46de8dd0c0c784cb878
    if (err) {
      console.log('unable to find user!!', err);
    } else {
      console.log('user password found', user[0].password);
      Bcrypt.compare(obj.password, user[0].password, function(err, result) {
        if (result) {
          console.log('password matched!', result);
          return true;
        } else {
          console.log('wrong password!');
        }
      });
    }
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

//Have not used this function yet
exports.viewPost = function(id) {
  return Post.find({ _id: id }, function(err, result) {
    if (err) {
      console.error('error in the view post method');
    } else {
      return result;
    }
  });
};
