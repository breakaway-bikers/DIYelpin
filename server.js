var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var path = require('path');
var port = process.env.PORT || 3000;
var morgan = require('morgan');
var db = require('./db.js');

app.use(morgan('combined'));
app.use(express.static(__dirname + '/'));
app.use(bodyparser.json());

db.createUser({ username: 'daniel', password: 'bacon' });

app.listen(port);
