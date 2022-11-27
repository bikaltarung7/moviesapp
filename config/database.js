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