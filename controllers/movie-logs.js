const MovieLog = require('../models/movie-log')

const listMovieLogs = async (req,res)=>{
    res.render('movie-log/index.ejs',{
        movieLogs:[]
    })
}

const showNewMovieLogForm = (req,res)=>{
    res.render('movie-log/new.ejs')
}

const createMovieLog = async(req,res)=>{
req.body.user = req.session.user._id
req.body.containsSpoilers = req.body.containsSpoilers === 'on'
await MovieLog.create(req.body)

res.redirect('/movie-logs')
}

module.exports = {
    listMovieLogs,
    showNewMovieLogForm,
    createMovieLog,
}