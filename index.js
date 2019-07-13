const express = require('express')
const port = process.env.PORT || 5000
const app = express();
const request = require('request');
const bp = require("body-parser");
const http = require('http');
const fetch = require('node-fetch');
var session = require('express-session')
var path = require('path');
const userController = require('./controllers/userController.js');

app.use(express.json({limit: '1mb'}))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }));

app.set("views", "views");
app.set('view engine', 'ejs');

app.listen(port, function() {
  console.log('Node app is running on port', port);
});

app.get("/reddit", userController.callReddit);

app.post('/login', userController.handleLogin);
app.post('/signup', userController.signup);








