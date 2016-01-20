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

//
//
//
db.createUser({ username: 'daniel', password: 'bacon' });
db.createPost({ username: 'daniel', title: 'whaaaaaaaa?', message: 'I hate bacon', category: 'recipe' });

db.createUser({ username: 'jon', password: 'elf' });
db.createPost({ username: 'jon', title: 'get to work!', message: 'working', category: 'work' });

db.createUser({ username: 'juan', password: 'frijoles' });
db.createPost({ username: 'juan', title: 'burritos', message: 'me gusta mi bicicleta', category: 'food' });

db.createUser({ username: 'raphael', password: 'shoes' });
db.createPost({ username: 'raphael', title: 'blingex', message: 'Can I wash your window?', category: 'clean' });

db.createUser({ username: 'admin', password: 'admin' });
db.createPost({ username: 'admin', title: 'administration', message: 'we are hacked', category: 'hack' });

app.get('/postList', function(req, res, next) {
  db.findAllPosts().then(function(posts) {
    res.status(200).send(posts);
  });
});

app.post('/authenticate', function(req, res, next) {
  console.log('get users');
  console.log(req.data);
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
  db.createUser(req.body).then(function(user, err) {
    if (err) {
      console.log('heres the error', err);
      res.status(406);
    } else {
      res.status(200);
    }
  });
});

app.post('/createPost', function(req, res, next) {
  console.log('request body', req.body);
  db.createPost(req.body).then(function(post, err) {
    if (err) {
      console.log(err);
      res.status(406);
    } else {
      res.status(200).send(post);
    }
  });
});

//Have not used  this handler either. I dont think we'll need it
app.post('/viewPost', function(req, res, next) {
  console.log('this is the request body', req.body);
  db.viewPost(req.body).then(function(post) {
    res.status(200).send(post);
  });
});

//
//
//
app.listen(port);
