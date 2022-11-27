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

// route to get all the movies
app.get('/api/movies', (req, res) => {
    // later to be extracted from the request body
    let page = 1
    let perPage = 5
    let title = null
    db.getAllMovies(page, perPage, title)
        .then(movies => {
            res.send(movies);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('Error Occured')
        })
})

// route to get movie by id
app.get('/api/movies/:id', (req, res) => {
    let movieId = req.params.id;
    db.getMovieById(movieId)
        .then(movie => {
            res.json(movie);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('Error Occured');
        });
})

app.listen(3000);