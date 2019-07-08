const express = require('express');
const mysql      = require('mysql');

const db = mysql.createConnection({
  host     : 'localhost',
  user     : 'admin',
  password : 'pablo',
});

db.connect(function(err){
    if (err) throw err
    console.log("My SQL is connected, looking good")
});

const api = express();



api.listen(5000);

console.log("Server is live and on port 5000....");


