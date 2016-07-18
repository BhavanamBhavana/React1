var express = require('express');
var router = express.Router();
var imdbObj = require('node-movie');
var jwt = require('jsonwebtoken');
var Movie = require('../../../models/movies/movie');
//var config=require('../../../config/config.json');
var app = express();


router.route('/movies')
// Get all movies
    .get(function(req, res){
      Movie.find(function(err, movies) {
            if (err)
                res.send(err);
            res.json(movies);
        });
    })
// Search and save the movie
  .post(function(req, res) {
        imdbObj(req.body.Title, function (err, data) {
        if (data){
        var movie = new Movie();
        movie.Title = data.Title;
        movie.Year =  data.Year;
        movie.Rated = data.Rated;
        movie.Released = data.Released;
        movie.Runtime = data.Runtime;
        movie.Genre = data.Genre;
        movie.Director = data.Director;
        movie.Writer = data.Writer;
        movie.Actors = data.Actors;
        movie.Plot = data.Plot;
        movie.Language = data.Language;
        movie.Country = data.Country;
        movie.Awards = data.Awards;
        movie.Poster = data.Poster;
        movie.Metascore = data.Metascore;
        movie.imdbRating = data.imdbRating;
        movie.imdbVotes = data.imdbVotes;
        movie.imdbID = data.imdbID;
        movie.Type = data.Type;
        movie.Response = data.Response;
        movie.save(function(err) {
            if (err)
                res.send(err);
            res.json({ message: 'Movie added!' });
              });
            }else {
              res.send(err);
            }
            });
        });

        // Add Movie route

      router.route('/movies/add')
      // Save movie
        .post(function(req, res) {
              var movie = new Movie();
              movie.Title = req.body.Title;
              movie.Year =  req.body.Year;
              movie.Poster = req.body.Poster;
              movie.imdbID = req.body.imdbID;
              movie.save(function(err) {
                  if (err)
                      res.send(err);
                  res.json({ message: 'Movie added!' });
                    });
                  });
// Route to get all movies and save a movie
    router.route('/movies/:movie_id')
// Get the movie by id
          .get(function(req, res) {
            Movie.findById(req.params.movie_id, function(err, movie) {
                if (err)
                    res.send(err);
                res.json(movie);
            });
        })
// Update the movie by id
        .put(function(req, res) {
        Movie.findById(req.params.movie_id, function(err, movie) {
            if (err)
                res.send(err);
            movie.Title = 'Hello';
            movie.save(function(err) {
                if (err)
                    res.send(err);
                res.json({ message: 'Movie updated!' });
            });
        });
    })
// Delete the movie by id
    .delete(function(req, res) {
        Movie.remove({
            _id: req.params.movie_id
        }, function(err, movie) {
            if (err)
                res.send(err);
            res.json({ message: 'Successfully deleted' });
        });
    });

  module.exports= router;



  //app.set('superSecret', config.secret);
  // Route to get all movies and save a movie
  /*router.use(function(req, res, next) {

  	// check header or url parameters or post parameters for token
  	var token = req.body.token || req.param('token') || req.headers['x-access-token'];

  	// decode token
  	if (token) {

  		// verifies secret and checks exp
  		jwt.verify(token, app.get('superSecret'), function(err, decoded) {
  			if (err) {
  				return res.json({ success: false, message: 'Failed to authenticate token.' });
  			} else {
  				// if everything is good, save to request for use in other routes
  				req.decoded = decoded;
  				next();
  			}
  		});

  	} else {

  		// if there is no token
  		// return an error
  		return res.status(403).send({
  			success: false,
  			message: 'No token provided.'
  		});

  	}

  });*/
