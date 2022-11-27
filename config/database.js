var uri = "mongodb+srv://app_user:gi30ui4BOqGPjsnF@cluster0.dpxuesy.mongodb.net/sample_mflix?retryWrites=true&w=majority"
var mongoose = require('mongoose');
var Movie = require('../models/movie')

// function to connect to the database
exports.initialize = async function (url) {
    try {
        await mongoose.connect(uri);
        return;
    } catch (err) {
        throw Error(err);
    }
}

// method to add a new movie
// takes a movie object as parameter
exports.addNewMovie = async function (movieData) {
    try {
        let movie = await Movie.create(movieData);
        return movie._id;
    }
    catch (err) {
        throw Error(err);
    }
}

// method to find all movies with pagination and title filter
// returns a promise
exports.getAllMovies = function (page, perPage, title) {
    // Return a promise that it will send array or movies
    return new Promise((resolve, reject) => {
        // prepare a general query to find movies
        var query = Movie.find()

        // check if needs filtering by title
        if (title) {
            query = query.where({ title: { $regex: '.*' + title + '.*' } })
        }

        // query execution
        query.sort('_id')                   // sort by id
            .skip((perPage - 1) * page)    // skip pages 
            .limit(perPage)                 // select only perPage number of records
            .exec()                         // execute the query
            .then((movies) => {             // get movies 
                resolve(movies);            // resolve the promise
            })
            .catch((err) => {
                reject(err);                // reject the promise on error
            })
    });
}

/*
//Alternate method using the async/await
exports.getAllMovies = async function (page, perPage, title) {
    try {
        var query = Movie.find()
        // check if needs filtering by title
        if (title) {
            query = query.where({ title: { $regex: '.*' + title + '.*' } })
        }

        // query execution
        let movies = await query.sort('_id')                   // sort by id
            .skip((perPage - 1) * page)    // skip pages 
            .limit(perPage)                 // select only perPage number of records
            .exec()                         // execute the query

        return movies;
    }
    catch (err) {
        throw Error(err);
    }
}
*/