var mongoose = require('mongoose');
const { db } = require('../models/movie');
var Movie = require('../models/movie')

// function to connect to the database
exports.initialize = async function (url) {
    try {
        await mongoose.connect(url);
        return;
    } catch (err) {
        throw err;
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
        throw err;
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
            // use regex to include partial title matches
            query = query.where({ title: { $regex: '.*' + title + '.*' } })
        }

        // query execution
        query.sort('_id')                   // sort by id
            .skip((page - 1) * perPage)    // skip pages 
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

// funtion to get movie by id
// returns promise 
exports.getMovieById = function (id) {
    return new Promise((resolve, reject) => {
        // check if provided id is a valid movie id or not
        if (!mongoose.Types.ObjectId.isValid(id)) {
            var err = new Error("Not a valid id");
            err.name = "Invalid_ID"
            reject(err);
        }

        // find the movie by id
        Movie.findById(id, (err, movie) => {
            if (err)
                reject(err)

            if (movie == null) {
                var err = new Error("Data not found");
                err.name = "Not_Found"
                reject(err);
            }

            resolve(movie);
        });
    });
}

// function to update movie
// takes movie id and data as parameter
// returns promise
exports.updateMovieById = function (id, data) {
    return new Promise((resolve, reject) => {
        // check if provided id is a valid id or not
        if (!mongoose.Types.ObjectId.isValid(id))
            reject(new Error('Not a valid id'));

        // find the movie by id and update
        Movie.findByIdAndUpdate(id, data, (err, movie) => {
            if (err)
                reject(err);
            resolve(movie);
        });
    });
}

// //Alternate way using async await
// exports.updateMovieById = async function (id, data) {
//     try {
//         if (!mongoose.Types.ObjectId.isValid(id))
//             throw Error('Not a valid id');

//         let movie = await Movie.findByIdAndUpdate(id, data).exec();
//         return movie;
//     }
//     catch (err) {
//         throw Error(err)
//     }
// }

// function to delete a movie
// takes a movie id as parameter
// returns promise
exports.deleteMovieById = function (id) {
    return new Promise((resolve, reject) => {
        // check if provided id is a valid movie id or not
        if (!mongoose.Types.ObjectId.isValid(id))
            reject(new Error('Not a valid id'));

        // find the movie and delete
        Movie.findByIdAndDelete(id, (err, movie) => {
            if (err)
                reject(new Error(err));
            resolve(movie);
        });
    });
}

//Alternate way using async/await
// exports.deleteMovieById = async function (id) {
//     try {
//         if (!mongoose.Types.ObjectId.isValid(id))
//             throw Error('Not a valid id');

//         let movie = await Movie.findByIdAndDelete(id).exec();
//         return movie;
//     }
//     catch (err) {
//         throw Error(err)
//     }
// }