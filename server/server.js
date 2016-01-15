var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var path = require('path');
var port = process.env.PORT || 3000;
var morgan = require('morgan');

app.use(morgan('combined'));
app.use(express.static(__dirname + '/../client'));
  app.use(bodyparser.json());

app.listen(port);
