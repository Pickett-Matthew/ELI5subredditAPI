const express = require('express')
const port = process.env.PORT || 5000
const app = express();
const request = require('request');
const bp = require("body-parser");
const http = require('http');
const fetch = require('node-fetch');
var session = require('express-session')
var path = require('path');
const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL || "";
const pool = new Pool({connectionString:connectionString});

app.use(express.json({limit: '1mb'}))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }));

app.set("views", "views");
app.set('view engine', 'ejs');

app.use(session({
  secret: 'Mmpjordan23',
  resave: false,
  saveUninitialized: true
}))

app.listen(port, function() {
  console.log('Node app is running on port', port);
});



app.get("/reddit", (req, res) => {

  const searchTerm = req.query.searchTerm;

  fetch('https://api.reddit.com/r/' + searchTerm + '/top.json?sort=rising&t=day&limit=4')

  .then(res => res.json())
  .then(function(myJson){
    console.log(myJson.data.children[0].data.title);

    const data = myJson.data.children[0].data.title;
    const data1 = myJson.data.children[1].data.title;
    const data2 = myJson.data.children[2].data.title;
    const data3 = myJson.data.children[3].data.title;

    const posts = {
      data:data,
      data1:data1,
      data2:data2, 
      data3:data3
    }

    res.render('results', posts)
  })
});



app.post('/login', handleLogin);

//processes the js script in public folder
function handleLogin(req, res) {
  console.log("Made it to the handle Login function");
  var result = {success: false};

  if(req.body.username == 'admin' && req.body.password =='password') {
    req.session.user = req.body.username;

    result= {success: true};
  }

  res.json(result);

}






