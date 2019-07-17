const fetch = require('node-fetch'); //for API request

const { Pool } = require('pg');
const db_url = process.env.DATABASE_URL;
const pool = new Pool({connectionString: db_url});

function callReddit(req, res) {
    
    const searchTerm = req.query.searchTerm;

    fetch('https://api.reddit.com/r/' + searchTerm + '/top.json?sort=top&t=day&limit=4')

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
}

function selected(req, res) {
    console.log('in the selected func');
    const checked = req.body.data;
  
    res.render('makePost', {checked:checked});
    console.log(checked);
};

function saveData(req, res) {
    console.log("made it to save data");

    const answer = req.body.answer;

    var param = [answer];

    var sql = "insert into posts (post) values($1)";

    pool.query(sql, param, function(err, data) {
        if(err) {
            console.log(err);
        } else {

            console.log("Post has been saved");
            res.send("youre answer has been saved")
            res.end();
        }
    })
}

module.exports = { 
    callReddit: callReddit, 
    selected: selected, 
    saveData: saveData
}