var mongoose = require('mongoose');
var Bcrypt = require('bcrypt');
var Salt_Factor = 10;
var Q = require('q');
var mongoURI = 'mongodb://diyelpin:Beansandburrito1600@ds047335.mongolab.com:47335/heroku_ws06b5hx';
var fs = require('fs');  // added for image handling

// mongo ds047335.mongolab.com:47335/heroku_ws06b5hx -u <diyelpin> -p <Beansandburrito1600>
// mongo ds047335.mongolab.com:47335/heroku_ws06b5hx -u diyelpin -p Beansandburrito1600

mongoose.connect(process.env.MONGOLAB_URI || mongoURI);

// mongoose.connect('mongodb://localhost/yelpin');

var db = mongoose.connection;

var User;
var exports = module.exports;


db.on('error', console.error.bind(console, 'connection error'));

db.once('open', function() {
  console.log('were connected');
});

// Image handling
// **********************************
var ImageSchema = new mongoose.Schema({
    // Added name property
    img: { data: Buffer, contentType: String, name: String }
});

var Img = mongoose.model('Image', ImageSchema);


exports.saveThePost = function(img, postObj){

  if (img){  
    var a = new Img;
    a.img.data = fs.readFileSync(img.path);
    a.img.contentType = 'image/jpg';
    // console.log("here is the database side filename", img.name);
    a.img.name = img.name;
    postObj.image = a;
  } 
    return exports.createPost(postObj)
}


var PostSchema = mongoose.Schema({
  username: String,
  date: String,
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
  image: [ImageSchema] 
});

var ContestSchema = mongoose.Schema({
  date: Date,
  ingredients:Array
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
var Contest = mongoose.model('Contest', ContestSchema);

exports.createUser = function(obj) {
  
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
      var user = new User(obj);
      user.save(function(err, user) {
        if (err) {
          console.log('DB CREATEUSER ERROR', user);
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

exports.createGoogleUser = function(obj, callback) {

  console.log("Creating Google User:", obj);
  var user = new User(obj);
  user.save(function(err, user) {
    if (err) {
      console.log("ERROR Creating Google user: ", err);
    } else {
      console.log('SUCCES SAVINE GOOGLE USER')
      console.log(user);
      return callback(err, user);
    }
  })

}

exports.findGoogleUser = function(userObj, callback) {

  console.log("------IN THE DB-------", userObj);
  return User.findOne({ username: userObj.username }, callback);
}


var makeNewContest = function(callback){
  console.log('making new contest for ', new Date().toDateString());

  var ingredients = {
    1: 'Mustard Greens', 2: 'Collard Greens',
    3: 'Dandelion Greens', 4: 'Kumquats',
    5: 'Quail', 6: 'Black Garlic',
    7: 'Tomatillos', 8: 'Rhubarb',
    9: 'Baby Fennel', 10: 'Cactus Pears',
    11: 'Zucchini', 12: 'Strawberries',
    13: 'Avocados', 14: 'Escarole',
    15: 'Duck Breast', 16: 'Rainbow Chard',
    17: 'Jicama', 18: 'Blueberries',
    19: 'Pineapple', 20: 'Mussels',
    21: 'Corn', 22: 'Lime',
    23: 'Carrots', 24: 'Celery',
    25: 'Spinach', 26: 'Onion',
    27: 'Rice', 28: 'Raspberries',
    29: 'Endive', 30: 'Scallions',
    31: 'Peas', 32: 'Chili Peppers',
    33: 'Coffee', 34: 'Muskmelon',
    35: 'Grapes', 36: 'Peaches',
    37: 'Mango', 38: 'Hazelnuts',
    39: 'Green Bell Peppers',
  };

  var populateDaily = function() {
    var dailyIngredients = [];
    for (var i = 0; i < 5; i++) {

      //generate random number
      var random = Math.floor(Math.random() * 39) + 1;
      var ingredient = ingredients[random];
      var duplicate = false;

      //search dailyIngredients for the current ingredient
      for (var j = 0; j < dailyIngredients.length; j++) {
        var daily = dailyIngredients[j];
        if (ingredient === daily) {
          duplicate = true;
        }
      }

      //if ingredient was already selected
      if (duplicate) {
        //run current loop iteration again
        i -= 1;
        continue;
      } else if (!duplicate) {
        //otherwise push to dailyIngredients
        dailyIngredients.push(ingredient);
      }
    }
    return dailyIngredients;
  };

  var contest = new Contest({
    date: new Date(),
    ingredients:populateDaily()
  });

  contest.save(function(err){
    if(err){
      console.log('error creating daily ingredients',err);
    }
    return callback(err,contest);
  })
};

exports.getContests = function(callback){

  Contest.find({},function(err,data){

    if(err) {
      console.error('error in get contests',err);
      return callback(err,null);
    }

    //check if a contest was created for today (it will be last)
    if(!data.length || data[data.length-1].date.toDateString() !== new Date().toDateString()){
      //we need to make a new contest for today
      makeNewContest(callback);
    }else{
      return callback(err,data);
    }

  });
};

exports.createPost = function(obj) {
  var post = new Post(obj);
  console.log('heres the post', post);

  //save the date that the post was created
  post.date = new Date();

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

      if(votedPost._id === null){
        console.log('Cannot Save null');
        return;
      }

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
              if (post.votes !== 0){
                post.votes--
              }
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

exports.findOneUser = function (user){
  return User.findOne({username: user.username}, function(err, user){
    if (err) {
      console.error('error finding a user');
    } else {
      console.log("^^^^^^^^^^^",user);
      return user;
    }
  })
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

exports.findOnePost = function(id) {
  return Post.find({ _id: id }, function(err, result) {
    if (err) {
      console.error('error in the view post method',err);
    } else {
      console.log("found post in db", result);
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
      console.log("found post in db", result);
      return result;
    }
  });
};
