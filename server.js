var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var path = require('path');
var port = process.env.PORT || 3000;
var morgan = require('morgan');

app.use(morgan('combined'));
app.use(express.static(__dirname + '/'));
app.use(bodyparser.json());

app.get('/', function(req, res) {
  console.log('request', req);
  console.log('response', res);
  res.status(200).send('Hello World');
});

app.listen(port);
