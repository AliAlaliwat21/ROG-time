const mongoose = require('mongoose')

const movieLogSchema = new mongoose.Schema(
    {
        user:{ //user is placed here to connect every movie log to the user who created it
            type:mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        title:{
            type:String,
            required:true,
            trim:true,
        },
        genre:{
            type:String,
            required:true,
            trim:true,
        },
            watchedDate: {
      type: Date,
      required:true
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    reviewText: {
      type: String,
      default: '',
      trim: true,
    },

    containsSpoilers: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

const MovieLog = mongoose.model('MovieLog', movieLogSchema)

    module.exports = MovieLog