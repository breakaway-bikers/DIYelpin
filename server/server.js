var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var path = require('path');
var port = process.env.PORT || 3000;
var morgan = require('morgan');
var db = require('./db.js');

// middleware for recieving multipart data (aka images)
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

// Variables needed for Google Login
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var passport = require('passport')
var config = require('./config')
var globalGoogleLoginID;

// app.use(morgan('combined'));
app.use(express.static(__dirname + './../client'));
app.use(bodyparser.json());

// Google Login
app.use(passport.initialize());
app.use(passport.session());

// Image post
app.post('/createPost', multipartMiddleware, function(req, res, next){
  /*
  if post includes an image:
    -> the body of the post is at req.body.postData
    -> the image file is at req.files.file.path

  if post does not have an image:
    -> the body of the post is as req.body
  */

  var img = false;

  if (req.files) {   // if an image is added
    imgPath = req.files.file.path;
    req.body = req.body.postData;
    img = req.files.file;
    // console.log("\n\nserver side filename: ", img.name, "\n\n");
  }

  db.saveThePost(img, req.body).then(function(dbRes, err){
    if (err) {
      console.log("Error from saveThePost function", err);
    }
    res.status(200).send(dbRes);
  })
});


app.get('/postList', function(req, res, next) {
  db.findAllPosts().then(function(posts) {
    res.status(200).send(posts);
  });
});

app.post('/authenticate', function(req, res, next) {
  console.log('/authentication:POST:');
  console.log(req.body);
  db.findUser(req.body).then(function(authenticated, err) {
    console.log('authenticated ', authenticated);
    console.log('error in authentication handler', err);
    if (authenticated) {
      console.log('sending 200');
      res.status(200).send(authenticated);
    } else {
      console.log('sending 401');
      res.status(401).send(authenticated);
    }
  });
});

app.post('/createUser', function(req, res, next) {
  console.log('/CREATEUSER:POST REQ.BODY', req.body)
  db.createUser(req.body).then(function(user, err) {
    console.log('data and error in createUser', user, '----', err);
    if (user === false) {
      console.error('createUser ERROR:', err);
      res.status(406).send(err);
    } else {
      console.log('createUser 200 OK:');
      res.status(200).send(user);
    }
  });
});


app.post('/vote', function(req, res, next) {
  db.vote(req.body)
  .then(function(data){
      res.status(200).send(data);
  })
})


app.post('/user', function(req, res, next){
  console.log('<<<<<<<<<',req.body)
  db.findOneUser(req.body)
  .then(function(data){
    res.status(200).send(data);
  })
})

app.get('/contest', function(req, res, next) {
  console.log('fetching contests');
  db.getContests(function(err,post) {
    if(err){
      res.status(400).send(err);
    }else{
      res.status(200).send(post);
    }
  });
});


// Have not used  this handler either. I dont think we'll need it.
app.get('/viewPost/:_id', function(req, res, next) {
  console.log('this is the request body', req.params);
  db.findOnePost(req.params).then(function(post) {
    console.log("this is the post>>>>>>", post);
    res.status(200).send(post);
  });
});

// Using POST Method to update the Post
app.post('/viewPost', function(req, res, next) {
  console.log('this is the View Post request body', req.body);
  db.viewPost(req.body).then(function(post) {
    res.status(200).send(post);
  });
});

// Updating the Message using PUT Method
app.put('/viewPost', function(req, res, next) {
  console.log("Trying to Update a Post", req.body);
  db.updatePost(req.body, function(err, data) {
    res.status(200).send(data);
  })
})

// Deleting the using DELETE Method
app.delete('/post/:_id', function(req, res, next) {
  console.log("Deleting a Post", req.params);
  db.deletePost(req.params).then(function(post) {
    res.status(200).send(post);
  })
})

app.get('/myPosts/:username', function(req, res, next) {
  db.viewPost(req.params).then(function(data) {
    res.status(200).send(data);
  })
})

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete Google profile is
//   serialized and deserialized.
passport.serializeUser(function(user, done) {
  console.log(":::::------- Serialize: ", user);
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  console.log(":::::------- deserialize: ", obj);
  done(null, obj);
});

passport.use(new GoogleStrategy({
    clientID: config.googleAuth.clientID,
    clientSecret: config.googleAuth.clientSecret,
    callbackURL: config.googleAuth.callbackURL
  },
  function(token, tokenSecret, profile, done) {

      console.log("-------------", typeof profile.displayName, " +++ ",profile.displayName);

      if (!profile.displayName) {
        profile.displayName = 'DIYelpin'
      }

      db.findGoogleUser({ username : profile.displayName }, function(err, user) {
      console.log("This is the user", user);

      if (user) {
        console.log("USER EXISTS IN THE DATABASE:", user);
        return done(null, user);
      } else {
        db.createGoogleUser({ username: profile.displayName }, function (err, user) {
          console.log("CREATING A NEW GOOGLE USER: ", user);
          if(!err) {
            console.log("CREATED USER:", user)
            return done(null, user);
          } else {
            console.log("ERROR:", err);
            return done(null, false);
          }
        });
      } // end of the if/else condition

    }); // end database condition
  }
));

// GET /auth/google
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Google authentication will involve
//   redirecting the user to google.com.  After authorization, Google
//   will redirect the user back to this application at /auth/google/callback
app.get('/auth/google/',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }),
  function(req, res){
    // The request will be redirected to Google for authentication, so this
    // function will not be called.
    console.log("Sending a Request to Google:", req.body);
  });

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get('/auth/google/callback/',
  passport.authenticate('google', { failureRedirect: '/#/signin' }),
  function(req, res) {
    console.log("USERNAME: ",req.session.passport.user);
    if (req.session.passport.user) {
      globalGoogleLoginID = req.session.passport.user.username;
      res.redirect('/#/postList');
    } else {
      res.redirect('/#/signin');
    }

  });

app.get('/googleLogin', function(req, res) {
  res.status(200).send(globalGoogleLoginID)
})

//
app.listen(port);
module.exports = app;
