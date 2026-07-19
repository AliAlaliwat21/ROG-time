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
    console.log(req.body)
    res.send('Movie log form received')
}

module.exports = {
    listMovieLogs,
    showNewMovieLogForm,
    createMovieLog,
}