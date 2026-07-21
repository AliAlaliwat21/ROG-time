const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const dns = require("node:dns")
dns.setServers(["8.8.8.8", "1.1.1.1"])
const path = require('path')
const MovieLogController = require('./controllers/movie-logs')
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const morgan = require("morgan");
const session = require('express-session')
const { MongoStore } = require('connect-mongo')
const passUserToView = require('./middleware/pass-user-to-view.js')
const isSignedIn = require('./middleware/is-signed-in.js')
const authCtrl = require('./controllers/auth')// imports all the function from the controllers auth.js file for later use

// Set the port from environment variable or default to 3000
const port = process.env.PORT ? process.env.PORT : "3000";


mongoose.connect(process.env.MONGODB_URI);//the db is connected through the url in env file

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

// Middleware to parse URL-encoded data from forms
app.use(express.urlencoded({ extended: false }));
// Middleware for using HTTP verbs such as PUT or DELETE
app.use(methodOverride("_method"));

app.use(express.static('public'))

// Morgan for logging HTTP requests
app.use(morgan('dev'));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI
    }),
}))
app.use(passUserToView)


const MovieController = require('./controllers/movies')

app.get('/', MovieController.getPopularMovies)

app.get('/auth/sign-up', authCtrl.showSignUpForm )
app.post('/auth/sign-up', authCtrl.signUp)
app.get('/auth/sign-in', authCtrl.showSignInForm)
app.post('/auth/sign-in', authCtrl.signIn)
app.delete('/auth/sign-out', authCtrl.signOut)

app.get('/dashboard', isSignedIn,(req,res)=>{
    res.render('dashboard.ejs')
})

app.get('/movie-logs', 
    isSignedIn,
    MovieLogController.listMovieLogs
)
app.get('/movie-logs/new', 
    isSignedIn,
    MovieLogController.showNewMovieLogForm
)
app.post('/movie-logs',
    isSignedIn,
    MovieLogController.createMovieLog
)

app.get('/movie-logs/:id',
    isSignedIn,
    MovieLogController.showMovieLog
)

app.get('/movie-logs/:id/edit',
    isSignedIn,
    MovieLogController.showEditMovieLogForm
)

app.put('/movie-logs/:id',
    isSignedIn,
    MovieLogController.updateMovieLog
)

app.delete('/movie-logs/:id',
    isSignedIn,
    MovieLogController.deleteMovie
)

app.get('/movies',
    MovieController.showAllPopularMovies
)

app.get('/movies/:id', 
    MovieController.showMovieDetails
)

app.get('/movies/:id', 
    MovieController.showMovieDetails
)

app.post('/movies/:id/comments',
    isSignedIn,
    MovieController.createComment
)
app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});
