const express = require('express');

const db = require('./config/database');
var Movie = require('./models/movie');
var app = express()

// initialize the database connection
db.initialize()
    .then(res => {
        console.log('Database connected');
    })
    .catch(err => {
        console.log('Connection to database failed. Exiting..');
        process.exit();
    })

app.listen(3000);