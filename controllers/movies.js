const { default: mongoose } = require("mongoose");


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

const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true,
    },
        tmdbMovieId: {
        type: Number,
        required: true,
    },
    text: {
        type: String,
        required: true,
        trim: true,
    },
},{ timestamps: true })

module.exports = {
    getPopularMovies,
    showAllPopularMovies,
    showMovieDetails
}