const fetch = require('node-fetch'); //for API request

const { Pool } = require('pg');
const db_url = process.env.DATABASE_URL || 'postgresql://matthewpickett:Mmpjordan23@localhost:5432/matthewpickett';
const pool = new Pool({connectionString: db_url});

function callReddit(req, res) {

    for(key in req.query) {
        console.log(key)
        const searchTerm = key;
    
    fetch('https://api.reddit.com/r/' + searchTerm + '/top.json?sort=hot&t=day&limit=4')

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
}


function selected(req, res) {
    console.log('in the selected function');
    const checked = req.body;

    var arr = new Array();
    for(key in checked) {

        arr.push(checked[key]);
    }

    res.render('makePost', {arr:arr})
};



function saveData(req, res) {
    console.log("made it to save data");

    const answer = req.body.answer;
    const question = req.body.question;

    const param = [answer, question];
    console.log(param + " This is being sent");

    var sql = "insert into posts (post, question) values($1, $2)";

    pool.query(sql, param, function(err, data) {
        if(err) {
            console.log(err);
        } else {

            console.log("Post has been saved");
            res.render("selectOption.ejs");
        }
    })
}

module.exports = { 
    callReddit: callReddit, 
    selected: selected, 
    saveData: saveData
}