var express = require('express');
var router = express.Router();
var moment = require('moment');

var directors = [];
var studios = [];
var starring = [];
var trailerLinks = [];
var imageLinks = [];
var defaultPosterImage = 'https://raw.githubusercontent.com/jovanidash21/coen3463-m3t6/master/public/images/poster_images/default.png';
var posterImage;

router.get('/', function(req, res, next) {
  if(req.user){
    moviesData.find()
      .then(function (moviesData) {
        res.render('movies', {
          user: req.user,
          title: 'Movies | MMFF Movies',
          navBarTitle: 'Movies',
          moviesData: moviesData,
          moment: moment
        });
      });
  }
  else{
    res.redirect('/');
  }
});

router.get('/add', function(req, res, next) {
  if(req.user.role === 'administrator' || req.user.role === 'editor'){
    res.render('movies-add', {
      user: req.user,
      title: 'Add New Movie | MMFF Movies',
      navBarTitle: 'Add New Movie'
    });
  }
  else{
    res.redirect('/');
  }
});

router.post('/add', function(req, res, next) {
  if(req.user.role === 'administrator' || req.user.role === 'editor'){
    if (req.body.posterImage.length == 0) {
      posterImage = defaultPosterImage
    }
    else{
      posterImage = req.body.posterImage;
    }

    directors.push({
      director1: req.body.director1,
      director2: req.body.director2,
      director3: req.body.director3
    });
    studios.push({
      studio1: req.body.studio1,
      studio2: req.body.studio2,
      studio3: req.body.studio3,
      studio4: req.body.studio4,
      studio5: req.body.studio5,
      studio6: req.body.studio6
    });
    starring.push({
      starring1: req.body.starring1,
      starring2: req.body.starring2,
      starring3: req.body.starring3,
      starring4: req.body.starring4,
      starring5: req.body.starring5,
      starring6: req.body.starring6,
      starring7: req.body.starring7,
      starring8: req.body.starring8,
      starring9: req.body.starring9,
      starring10: req.body.starring10,
      starring11: req.body.starring11,
      starring12: req.body.starring12
    });
    trailerLinks.push({
      trailerLink1: req.body.trailerLink1,
      trailerLink2: req.body.trailerLink2,
      trailerLink3: req.body.trailerLink3
    });
    imageLinks.push({
      imageLink1: req.body.imageLink1,
      imageLink2: req.body.imageLink2,
      imageLink3: req.body.imageLink3,
      imageLink4: req.body.imageLink4
    });

    var movie = {
      title: req.body.title,
      directors: directors,
      studios: studios,
      starring: starring,
      posterImage: posterImage,
      year: req.body.year,
      genre: req.body.genre,
      plot: req.body.plot,
      imdbLink: req.body.imdbLink,
      trailerLinks: trailerLinks,
      imageLinks: imageLinks,
      grossTicketSales: req.body.grossTicketSales
    };
    var movieData = new moviesData(movie);
    movieData.save(function(err){
      if(!err){
        req.flash('alertMessage', 'New Movie Added!');
        res.redirect('/');
      }
      else
      {
        res.end(err);
      }
    });
  }
  else{
    res.redirect('/');
  }
});

router.get('/:movieID/', function(req, res, next) {
  if(req.user){
    var movieID = req.params.movieID;
    moviesData.findOne({_id: movieID}, function (err, movieData){
      if (!err) {
        res.render('movies-profile', {
          user: req.user,
          title: 'Movie Profile | MMFF Movies',
          navBarTitle: 'Movie Profile',
          movieData: movieData,
          moment: moment
        });
      }
      else {
          res.end(err);
      }
    });
  }
  else{
    res.redirect('/');
  }
});

router.get('/:movieID/edit', function(req, res, next) {
  if(req.user.role === 'administrator' || req.user.role === 'editor'){
    var movieID = req.params.movieID;
    moviesData.findOne({_id: movieID}, function (err, movieData){
      if(!err) {
        res.render('movies-edit', {
          user: req.user,
          title: 'Edit Movie | MMFF Movies',
          navBarTitle: 'Update Movie',
          movieData: movieData,
          moment: moment
        });
      }
      else {
        res.end(err);
      }
    });
  }
  else{
    res.redirect('/');
  }
});

router.post('/:movieID/edit', function(req, res, next) {
  if(req.user.role === 'administrator' || req.user.role === 'editor'){
    var movieID = req.params.movieID;

    if (req.body.posterImage.length == 0) {
      posterImage = defaultPosterImage;
    }
    else{
      posterImage = req.body.posterImage;
    }

    directors.push({
      director1: req.body.director1,
      director2: req.body.director2,
      director3: req.body.director3
    });
    studios.push({
      studio1: req.body.studio1,
      studio2: req.body.studio2,
      studio3: req.body.studio3,
      studio4: req.body.studio4,
      studio5: req.body.studio5,
      studio6: req.body.studio6
    });
    starring.push({
      starring1: req.body.starring1,
      starring2: req.body.starring2,
      starring3: req.body.starring3,
      starring4: req.body.starring4,
      starring5: req.body.starring5,
      starring6: req.body.starring6,
      starring7: req.body.starring7,
      starring8: req.body.starring8,
      starring9: req.body.starring9,
      starring10: req.body.starring10,
      starring11: req.body.starring11,
      starring12: req.body.starring12
    });
    trailerLinks.push({
      trailerLink1: req.body.trailerLink1,
      trailerLink2: req.body.trailerLink2,
      trailerLink3: req.body.trailerLink3
    });
    imageLinks.push({
      imageLink1: req.body.imageLink1,
      imageLink2: req.body.imageLink2,
      imageLink3: req.body.imageLink3,
      imageLink4: req.body.imageLink4
    });

    moviesData.findOne({_id: movieID}, function(err, movieData) {
      if(!err){
        movieData.title = req.body.title;
        movieData.posterImage = posterImage;
        movieData.directors = directors;
        movieData.studios = studios;
        movieData.starring = starring;
        movieData.year = req.body.year;
        movieData.genre = req.body.genre;
        movieData.plot = req.body.plot;
        movieData.imdbLink = req.body.imdbLink;
        movieData.trailerLinks = trailerLinks;
        movieData.imageLinks = imageLinks;
        movieData.grossTicketSales = req.body.grossTicketSales;
        movieData.save(function(err, movieData){
          if(!err){
            res.render('movies-edit', {
              title: 'Edit Movie | MMFF Movies',
              navBarTitle: 'Update Movie',
              alertMessage: 'Movie Updated',
              postError: false,
              movieData: movieData,
              moment: moment
            });
          }
          else{
            res.render('movies-edit', {
              title: 'Edit Movie | MMFF Movies',
              navBarTitle: 'Update Movie',
              alertMessage: 'Movie Not Updated! Please Try Again',
              postError: true,
              movieData: movieData,
              moment: moment
            });
          }
        });
      }
      else {
        res.end(err);
      }
    });
  }
  else{
    res.redirect('/');
  }
});

router.post('/:movieID/delete', function(req, res, next) {
  if(req.user.role === 'administrator'){
    var movieID = req.params.movieID;
    if (req.user.role === 'administrator'){
      moviesData.remove({_id: movieID}, function(err){
        if(!err){
          req.flash('alertMessage', 'Movie Deleted!');
          res.redirect('/');
        }
        else {
          res.end(err);
        }
      });
    }
  }
  else{
    res.redirect('/');
  }
});

module.exports = router;