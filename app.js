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


app.post('/api/movies', (req, res) => {
    let movie = new Movie({
        // later to be extracted from request
        plot: "The Plot",
        genre: ["Genre A", "Genre B"],
        runtime: 101
    });

    // pass the movie to addMovie function
    db.addNewMovie(movie)
        .then((id) => {
            console.log("Movie Added")
            movie._id = id;
            res.send(movie);
        })
        .catch(err => {
            console.log(err);
        })
});

app.listen(3000);