var express = require('express');
var _ = require('underscore');
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var Movie = require('./models/movie')
var port = process.env.PORT || 4000;
var path = require('path');

var app = express();

mongoose.connect('mongodb://localhost/imooc')

app.set('views', './views/pages');
app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(express.static(path.join(__dirname, 'bower_components')));
app.locals.moment = require('moment')
app.listen(port);

console.log('program start on port' + port);
app.get('/', function(req, res) {
	Movie.fetch(function(err, movies) {
		if (err) {
			console.log(err)
		}
		res.render('index', {
			title: '影院热度播报',
			movies: movies
		})
	})
});

app.get('/movie/:id', function(req, res) {
	var id = req.params.id

	Movie.findById(id,function(err,movie){
		res.render('detail',{
				title:movie.title,
				movie:movie
		})
	})

})
app.get('/admin/movie', function(req, res) {
	res.render('admin', {
		title: '后台录入',
		movie: {
			title: '',
			doctor: '',
			country: '',
			year: '',
			poster: '',
			flash: '',
			summary: '',
			language: ''
		}
	})
})

app.get('/admin/update/:id',function(req,res){
	var id = req.params.id

	if(id){
		Movie.findById(id,function(err,movie){
			res.render('admin',{
				title:'imooc 后台更新页面',
				movie:movie
			})
		})
	}
})

// admin post movie
app.post('/admin/movie/new', function(req, res) {
	var id = req.body.movie._id
	var movieObj = req.body.movie

	var _movie

	if (id !== 'undefined') {
		Movie.findById(id, function(err, movie) {
			if (err) {
				console.log(err)
			}

			_movie = _.extend(movie, movieObj)
			_movie.save(function(err, movie) {
				if (err) {
					console.log(err)
				}

				res.redirect('/movie/' + _movie.id)
			})

		})
	} else {
		_movie = new Movie({
			doctor: movieObj.doctor,
			title: movieObj.title,
			country: movieObj.country,
			language: movieObj.language,
			year: movieObj.year,
			poster: movieObj.poster,
			summary: movieObj.summary,
			flash: movieObj.flash,
		})

		_movie.save(function(err, movie) {
			if (err) {
				console.log(err)
			}

			res.redirect('/movie/' + _movie.id)
		})
	}
})

app.get('/admin/list', function(req, res) {
	Movie.fetch(function(err,movies){
		if(err){
			console.log(err)
		}
		res.render('list',{
			title:'imooc 列表页',
			movies:movies
		})
	})
})