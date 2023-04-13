var mysql = require('mysql');
const config = require('./config.json')

var conn = mysql.createConnection({
    host: config.host, 
    user: config.user, 
    password: config.password,
    database: config.database,
     
}); 
conn.connect(function(err) { 
  if (err){console.log(err)};
  console.log('Database is connected successfully !'); 
}); 
module.exports = conn