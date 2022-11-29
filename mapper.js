const Movie = require('./models/movie.js')

exports.mapMovie = function (req, res, next) {
    var movie = ({
        plot: req.body.plot,
        genres: [req.body.genres],
        runtime: req.body.runtime,
        cast: [req.body.cast],
        num_mflix_comments: req.body.num_mflix_comments,
        poster: req.body.poster,
        title: req.body.title,
        fullplot: req.body.fullplot,
        countries: [req.body.countries],
        languages: [req.body.languages],
        released: req.body.released,
        directors: [req.body.directors],
        writers: [req.body.writers],
        rated: req.body.rated,
        awards: {
            wins: req.body.wins,
            nominations: req.body.nominations,
            text: req.body.text
        },
        lastupdated: req.body.lastupdated,
        year: req.body.year,
        imdb: {
            rating: req.body.i_rating,
            votes: req.body.i_votes,
            id: req.body.i_id
        },
        type: req.body.type,
        tomatoes: {
            viewer: {
                rating: req.body.v_rating,
                numReviews: req.body.v_numReviews,
                meter: req.body.v_meter
            },
            dvd: req.body.dvd,
            production: req.body.production,
            critic: {
                rating: req.body.c_rating,
                numReviews: req.body.c_numReviews,
                meter: req.body.c_rating
            },
            lastupdated: req.body.t_lastupdated,
            rotten: req.body.rotten,
            fresh: req.body.fresh
        }
    });

    req.body.movie = movie;
    next();
}
