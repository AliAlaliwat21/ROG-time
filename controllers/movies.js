

const getPopularMovies = async (req, res) => {
    const response = await fetch('https://api.themoviedb.org/3/movie/popular', {
        headers: {
            Authorization: `Bearer ${process.env.TMDB_TOKEN}`
        }
    })

    const data = await response.json()

    res.render('home.ejs', {
        popularMovies: data.results.slice(0, 5)
    })
}

const showAllPopularMovies = async (req, res) => {
    const response = await fetch('https://api.themoviedb.org/3/movie/popular', {
        headers: {
            Authorization: `Bearer ${process.env.TMDB_TOKEN}`
        }
    })

    const data = await response.json()

    res.render('movies.ejs', {
        popularMovies: data.results
    })
}

const showMovieDetails = async(req,res)=>{
        const response = await fetch(`https://api.themoviedb.org/3/movie/${req.params.id}`, {
        headers: {
            Authorization: `Bearer ${process.env.TMDB_TOKEN}`
        }
    })

    const movie = await response.json()

    res.render('movie-details.ejs', {
        movie: movie
    })
}
const Comment = require('../models/comments')

const createComment = async (req, res) => {
    await Comment.create({
        user: req.session.user._id,
        tmdbMovieId: req.params.id,
        text: req.body.text,
    })

    res.redirect(`/movies/${req.params.id}`)
}

module.exports = {
    getPopularMovies,
    showAllPopularMovies,
    showMovieDetails,
    createComment
}
