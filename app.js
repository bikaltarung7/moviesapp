const express = require('express');

const db = require('./config/database');
const mapper = require('./mapper.js')
const dotenv = require('dotenv');
dotenv.config();
var app = express()

app.use(express.urlencoded({ extended: true }));

// prepare database url
const server = process.env.SERVER
const host = process.env.HOST
const user = process.env.USER_NAME
const pwd = process.env.PASSWORD
const database = process.env.DATABASE

const url = `${server}://${user}:${pwd}@${host}/${database}`

const port = process.env.PORT

// initialize the database connection
db.initialize(url)
    .then(res => {
        console.log('Database connected');
    })
    .catch(err => {
        console.log('Connection to database failed. Exiting..');
        process.exit();
    })

// route to add a new movie
app.post('/api/movies', mapper.mapMovie, (req, res, next) => {
    let movie = req.body.movie;

    // pass the movie to addMovie function
    db.addNewMovie(movie)
        .then((id) => {
            console.log("Movie Added")
            movie._id = id;
            res.json(movie);
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        })
});

// route to get all the movies
app.get('/api/movies', (req, res) => {
    // later to be extracted from the request body
    let page = req.query.page || 1
    let perPage = req.query.perPage || 5
    let title = req.query.title

    db.getAllMovies(page, perPage, title)
        .then(movies => {
            res.send(movies);
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
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
            if (err.name == "Invalid_ID") {
                res.status(400).json({ message: err.message });
                return;
            }

            if (err.name == "Not_Found") {
                res.status(404).json({ message: err.message });
                return
            }
            res.status(500).json({ message: err.message });
        });
});

// route to update a movie by id
app.put('/api/movies/:id', mapper.mapMovie, (req, res, next) => {
    let movieId = req.params.id;
    let movie = req.body.movie;

    db.updateMovieById(movieId, movie)
        .then(movie => {
            return db.getMovieById(movie._id)
        })
        .then(updatedMovie => {
            res.json(updatedMovie);
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        });
});

// route to delete a movie by id
app.delete('/api/movies/:id', (req, res) => {
    let movieId = req.params.id;

    db.deleteMovieById(movieId)
        .then(movie => {
            res.json({ message: "Movie deleted successfully" })
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        })
});

app.listen(port);