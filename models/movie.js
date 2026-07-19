const mongoose = require('mongoose')

const movieSchema = new mongoose.SchemaTypes({
    tmdbId:{
        type: Number,
        required: true,
        unique:true
    }
})