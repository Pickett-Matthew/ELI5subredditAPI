const { Pool } = require('pg');
const db_url = process.env.DATABASE_URL;
const pool = new Pool({connectionString: db_url});


function signup(req, res){
    console.log("signup page requested");

    const username = req.body.username;
    const password = req.body.password;

    const params = [username, password];
    var sql = "insert into users (username, password) values($1, $2)";

    pool.query(sql, params, function(err, data) {
        if(err) {
            console.log(err)
        } else {

            console.log("inserted into db");
        };
    });
};

function handleLogin(req, res) {
    console.log("Made it to the handle Login function");
    var result = {success: false};

    if(req.body.username == 'admin' && req.body.password =='password') {
        req.session.user = req.body.username;

        result= {success: true};
    }
    res.json(result);
}


module.exports = {
    signup: signup, 
    handleLogin: handleLogin
}