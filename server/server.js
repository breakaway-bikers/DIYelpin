var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var path = require('path');
var port = process.env.PORT || 3000;
var morgan = require('morgan');
var db = require('./db.js');

// app.use(morgan('combined'));
app.use(express.static(__dirname + './../client'));
app.use(bodyparser.json());


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

app.post('/createPost', function(req, res, next) {
  console.log('request body', req.body);
  db.createPost(req.body).then(function(post, err) {
    if (err) {
      console.log('create post err:', err);
      res.status(406);
    } else {
      console.log('createPost 200 ok:')
      res.status(200).send(post);
    }
  });
});

// Have not used  this handler either. I dont think we'll need it.
app.post('/viewPost', function(req, res, next) {
  console.log('this is the request body', req.body);
  db.viewPost(req.body).then(function(post) {
    res.status(200).send(post);
  });
});

//
app.listen(port);
module.exports = app;
