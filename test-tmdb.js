const dotenv = require('dotenv')
dotenv.config()

const testTMDB = async () => {
    const response = await fetch('https://api.themoviedb.org/3/movie/popular', {
        headers: {
            Authorization: `Bearer ${process.env.TMDB_TOKEN}`
        }
    })

    const data = await response.json()
    console.log(data)
}

testTMDB()