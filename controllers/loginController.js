const { Pool } = require('pg');
const db_url = process.env.DATABASE_URL || 'postgresql://matthewpickett:Mmpjordan23@localhost:5432/matthewpickett';
const pool = new Pool({connectionString: db_url});


function signup(req, res){
    //insert into db
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
            res.render('selectOption')
        };
    });
};

function handleLogin(req, res) {
    console.log("Made it to the handle Login function");
    var result = {success: false};

    const username = req.body.username;
    const password = req.body.password;

    var sql = "SELECT username, password from users WHERE username=$1::text and password=$2::text";
    var params = [username, password];
    
    pool.query(sql, params, (err, results) => {
        if(err) {
            console.log(err);
            return next(err);
            
        } else {
            console.log("Success Login by: " + JSON.stringify(results.rows));
            res.render('selectOption');
        }
    })
}


module.exports = {
    signup: signup, 
    handleLogin: handleLogin
}