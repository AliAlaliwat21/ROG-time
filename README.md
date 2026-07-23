# ROG-time
# 🎬 Rog-Time

> Your watchlist deserves better.

Rog-Time is a movie tracking, logging, and review platform built for my General Assembly Software Engineering bootcamp final project. Inspired by Letterboxd and TV Time, Rog-Time lets users browse popular movies via The Movie Database (TMDB), log and review the movies they've personally watched, and leave public reviews on any movie in the TMDB catalog.

## 📖 Description

Rog-Time was built in two phases. The first phase focused on a fully functional MVP: manual movie logging with full CRUD, session-based authentication, and ownership-based authorization — all built and tested before any external API was introduced. The second phase layered in TMDB integration, letting users browse and search real movie data, view detailed movie pages, and leave public comments/reviews tied to any movie by its TMDB ID.

## 🔗 Links

- [Deployed App](#) <!-- add your live link here -->
- [Planning materials / Trello board](#) <!-- optional -->

## 🛠️ Technologies Used

- Node.js
- Express
- EJS
- MongoDB
- Mongoose
- express-session
- connect-mongo
- bcrypt
- method-override
- morgan
- dotenv
- [TMDB API](https://www.themoviedb.org/documentation/api)

## ✅ Features

- **Authentication** — sign up, sign in, sign out with hashed passwords and session storage
- **Movie Logs (Full CRUD)** — signed-in users can log movies they've watched, with genre, watch date, rating, review text, and a spoiler flag
- **Authorization** — only the creator of a movie log can see or use its edit/delete controls, enforced both in the view and in the controller
- **TMDB Integration** — browse popular movies, search by title, and view full movie details (overview, runtime, rating, poster)
- **Public Comments** — any signed-in user can leave a public review on any movie, independent of their private movie logs
- **Favoriting** — users can favorite/unfavorite comments left by others
- **Dashboard** — a personal view of all comments/reviews the signed-in user has written

## 🚀 Getting Started

1. Clone this repository
2. Run `npm install`
3. Create a `.env` file with the following variables:
4. Run `npm start` (or `nodemon server.js` for development)
5. Visit `http://localhost:3000`

## Models

**User**
- username
- password (hashed)

**MovieLog** (relates to User)
- user (ref: User)
- title
- genre
- watchedDate
- rating
- reviewText
- containsSpoilers

**Comment** (relates to User, references a TMDB movie by ID)
- user (ref: User)
- tmdbMovieId
- text
- favoritedBy (array of User refs)

## Route Table

| Method | Route | Purpose |
|---|---|---|
| GET | `/` | Homepage with popular movies |
| GET | `/auth/sign-up` | Show sign-up form |
| POST | `/auth/sign-up` | Create a new user |
| GET | `/auth/sign-in` | Show sign-in form |
| POST | `/auth/sign-in` | Sign in a user |
| DELETE | `/auth/sign-out` | Sign out |
| GET | `/dashboard` | Signed-in user's reviews |
| GET | `/movie-logs` | List signed-in user's movie logs |
| GET | `/movie-logs/new` | Show new movie log form |
| POST | `/movie-logs` | Create a movie log |
| GET | `/movie-logs/:id` | Show one movie log |
| GET | `/movie-logs/:id/edit` | Show edit form |
| PUT | `/movie-logs/:id` | Update a movie log |
| DELETE | `/movie-logs/:id` | Delete a movie log |
| GET | `/movies` | Browse popular movies (TMDB) |
| GET | `/movies/:id` | Movie details + comments |
| GET | `/search` | Search movies (TMDB) |
| POST | `/movies/:id/comments` | Post a comment on a movie |
| PUT | `/comments/:id/favorite` | Favorite/unfavorite a comment |
| DELETE | `/comments/:id` | Delete a comment |

## Future Enhancements

- Let users search TMDB directly when logging a movie, instead of typing a title manually
- Add a dedicated `Movie` model to cache TMDB data locally
- Top 5 favorite movies on user profiles
- Public user profile pages

## Attributions

- Movie data and images provided by [TMDB](https://www.themoviedb.org/). This product uses the TMDB API but is not endorsed or certified by TMDB.