const MovieLog = require('../models/movie-log')

const listMovieLogs = async (req, res) => {
    const movieLogs = await MovieLog.find({ user: req.session.user._id })

    res.render('movie-log/index.ejs', {
        movieLogs: movieLogs
    })
}

const showNewMovieLogForm = (req,res)=>{
    res.render('movie-log/new.ejs')
}

const createMovieLog = async (req, res) => {
    req.body.user = req.session.user._id

    const existingLog = await MovieLog.findOne({
        user: req.body.user,
        title: req.body.title
    })

    if (existingLog) {
        return res.send('You have already logged this movie.')
    }

    req.body.containsSpoilers = req.body.containsSpoilers === 'on'

    await MovieLog.create(req.body)

    res.redirect('/movie-logs')
}

const showMovieLog = async (req, res) => {
    const movieLog = await MovieLog.findById(req.params.id)

    res.render('movie-log/show.ejs', {
        movieLog: movieLog
    })
}
module.exports = {
    listMovieLogs,
    showNewMovieLogForm,
    createMovieLog,
    showMovieLog
}