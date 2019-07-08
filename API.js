const express = require('express');
const mysql      = require('mysql');

const db = mysql.createConnection({
  host     : 'localhost',
  user     : 'admin',
  password : 'pablo',
  database : 'blogss'
});

db.connect(function(err){
    if (err) throw err
    console.log("My SQL is connected, looking good")
});

const api = express();
// creating db
api.get('/createdb',(req, res) => {
    let sql = 'CREATE DATABASE blogss'
    db.query( sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Database created ... ')
    });
});
// create a table
api.get("/createposttable", (req, res) => {
    let sql = 'CREATE TABLE postsss (ID int NOT NULL AUTO_INCREMENT, title varchar(255), body varchar(255), PRIMARY KEY (ID))'
    db.query( sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send("Table created ...");
    });
});
// inserts a post into posts table
api.get("/addpost", (req, res) => {
    let post = {title: "My first Post", body: "Hello today was a good day"}
    let sql = 'INSERT INTO postsss SET ?';
    db.query( sql, post,  (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send("first post add");
    })
});

api.get("/secpost", (req, res) => {
    let post = {title: "something", body: "Something else"}
    let sql = 'INSERT INTO postsss SET ?';
    db.query( sql, post,  (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send("add the second");
    })
});

// select all post
api.get("/getposts", (req, res) => {
    let sql = 'SELECT * FROM postsss';
    db.query( sql,  (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    })
});

//select a single post
api.get("/getpost/:id", (req, res) => {
    let sql = 'SELECT * FROM postsss WHERE ID =' + req.params.id;
    db.query( sql,  (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    })
});

api.get("/deletepost/:id", (req, res) => {
    let sql = 'DELETE FROM postsss WHERE ID =' + req.params.id;
    db.query( sql,  (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    })
});



api.listen(5000);

console.log("Server is live and on port 5000....");


