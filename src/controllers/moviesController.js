/*const db = require('../database/models');
const sequelize = db.sequelize;

//Otra forma de llamar a los modelos
const Movies = db.Movie;*/
const {validationResult} = require('express-validator');
const {Movie, Sequelize} = require('../database/models');
const {Op} = Sequelize;

const moviesController = {
    'list': (req, res) => {
        Movie.findAll()
            .then(movies => {
                res.render('moviesList.ejs', {movies})
            })
    },
    'detail': (req, res) => {
        Movie.findByPk(req.params.id)
            .then(movie => {
                res.render('moviesDetail.ejs', {movie});
            });
    },
    'new': (req, res) => {
        Movie.findAll({
            order : [
                ['release_date', 'DESC']
            ],
            limit: 5
        })
            .then(movies => {
                res.render('newestMovies', {movies});
            });
    },
    'recomended': (req, res) => {
        Movie.findAll({
            where: {
                rating: {[Op.gte] : 8}
            },
            order: [
                ['rating', 'DESC']
            ]
        })
            .then(movies => {
                res.render('recommendedMovies.ejs', {movies});
            });
    }, //Aqui debemos modificar y completar lo necesario para trabajar con el CRUD
    add: function (req, res) {
        res.render('moviesAdd');   
    },
    create: function (req, res) {
        const errors = validationResult(req);

        if(errors.isEmpty()) {
            Movie.create({
                title: req.body.title,
                rating: req.body.rating,
                awards: req.body.awards,
                length: req.body.length,
                release_date: req.body.release_date
              })
              .then((movie) => {
                res.redirect('/movies')
    })
              .catch((error) => console.log(error))

        } else {
            return res.render("moviesAdd", {errors: errors.mapped()});
        }

    },
    edit: function(req, res) {
        const MOVIE_ID = req.params.id;

        Movie.findByPk(MOVIE_ID)
        .then(Movie => {
            return res.render("moviesEdit", {Movie}) 
        })
        .catch(error => console.log(error));
        
    },
    update: function (req,res) {
        const errors = validationResult(req);
        const MOVIE_ID = req.params.id;

        if(errors.isEmpty()){
                               
            Movie.update({
                title: req.body.title,
                rating: req.body.rating,
                awards: req.body.awards,
                length: req.body.length,
                release_date: req.body.release_date
            },
            { where : {id: MOVIE_ID}}
            )
            .then((response) => {
                if (response) {
                    return res.redirect (`/movies/detail/${MOVIE_ID}`)
                    } else {
                        throw new Error()
                    }
            })
            .catch(error=> {
                return console.log(error)})
    } else{
        Movie.findByPk(MOVIE_ID)
        .then(Movie => {
            return res.render("moviesEdit", {
                Movie,
                errors: errors.mapped()}) 
        })
        .catch((error) => console.log(error))
        }
    },

    delete: function (req, res) {
        const MOVIE_ID = req.params.id;

        Movie.findByPk(MOVIE_ID)
        .then(Movie => res.render("moviesDelete", {Movie}))
        .catch(error => console.log(error))
    },
    destroy: function (req, res) {
        const MOVIE_ID = req.params.id;

        Movie.destroy({
            where: {id: MOVIE_ID}
        })
        .then(() => {
            return res.redirect("/movies")
        })
        .catch((error) => console.log(error))

    }

}

module.exports = moviesController;