const Comment = require('../models/comments')

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

const showMovieDetails = async (req, res) => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${req.params.id}`, {
        headers: {
            Authorization: `Bearer ${process.env.TMDB_TOKEN}`
        }
    })

    const movie = await response.json()

    const comments = await Comment.find({ tmdbMovieId: req.params.id }).populate('user')

    res.render('movie-details.ejs', {
        movie: movie,
        comments: comments
    })
}

const createComment = async (req, res) => {
    await Comment.create({
        user: req.session.user._id,
        tmdbMovieId: req.params.id,
        text: req.body.text,
    })

    res.redirect(`/movies/${req.params.id}`)
}
const toggleFavoriteComment = async (req, res) => {
    const comment = await Comment.findById(req.params.id)

    if (!comment.favoritedBy) {
        comment.favoritedBy = []
    }

    console.log('Before:', comment.favoritedBy)

    const alreadyFavorited = comment.favoritedBy.some(function(userId) {
        return userId.equals(req.session.user._id)
    })

    console.log('Already favorited?', alreadyFavorited)

    if (alreadyFavorited) {
        comment.favoritedBy.pull(req.session.user._id)
    } else {
        comment.favoritedBy.push(req.session.user._id)
    }

    console.log('After:', comment.favoritedBy)

    await comment.save()

    res.redirect(`/movies/${comment.tmdbMovieId}`)
}

const deleteComment = async (req, res) => {
    const comment = await Comment.findById(req.params.id)

    if (!comment.user.equals(req.session.user._id)) {
        return res.send("You are not authorized to do that.")
    }

    await Comment.findByIdAndDelete(req.params.id)

    res.redirect(`/movies/${comment.tmdbMovieId}`)
}

const searchMovies = async (req, res) => {
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(req.query.query)}`, {
        headers: {
            Authorization: `Bearer ${process.env.TMDB_TOKEN}`
        }
    })

    const data = await response.json()

    res.render('search-results.ejs', {
        movies: data.results,
        query: req.query.query
    })
}
module.exports = {
    getPopularMovies,
    showAllPopularMovies,
    showMovieDetails,
    createComment,
    toggleFavoriteComment,
    deleteComment,
    searchMovies
}