var mongoose = require('mongoose');
var Schema = mongoose.Schema;

movieSchema = new Schema({
    plot: String,
    genre: [String],
    runtime: Number,
    cast: [String],
    num_mflix_comments: Number,
    title: String,
    fullplot: String,
    countries: [String],
    released: Date,
    directories: [String],
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
        viewer:{
            rating: Number,
            numReviews: Number,
            meter: Number
        },
        lastupdated: Date
    }
});

viewerSchema = new Schema({
    
})

module.exports = mongoose.model('Movie',movieSchema)