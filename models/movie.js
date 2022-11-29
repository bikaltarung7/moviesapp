var mongoose = require('mongoose');
var Schema = mongoose.Schema;

movieSchema = new Schema({
    plot: String,
    genres: [String],
    runtime: Number,
    cast: [String],
    num_mflix_comments: Number,
    poster: String,
    title: String,
    fullplot: String,
    countries: [String],
    languages: [String],
    released: Date,
    directors: [String],
    writers: [String],
    rated: String,
    awards: {
        wins: Number,
        nominations: Number,
        text: String
    },
    lastupdated: Date,
    year: Number,
    imdb: {
        rating: Number,
        votes: Number,
        id: Number
    },
    type: String,
    tomatoes: {
        viewer: {
            rating: Number,
            numReviews: Number,
            meter: Number
        },
        dvd: Date,
        production: String,
        critic: {
            rating: Number,
            numReviews: Number,
            meter: Number
        },
        lastupdated: Date,
        rotten: Number,
        fresh: Number
    }
});

module.exports = mongoose.model('Movie', movieSchema)