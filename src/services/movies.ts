// TODO: Change this to .env
const API_KEY = '1ba7ba79'

export type Movie = {
  title: string
  year: string
  id: string
  type: string
  poster: string | null
}

type MovieResult = {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}

const Errors = {
  NotFound: 1,
  TooManyResults: 2,
}

export default function getMovies(searchQuery: string): Promise<Movie[]> {
  return new Promise((resolve, reject) => {
    fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${searchQuery}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.Response === 'True') {
          resolve(res.Search.map(parseMovie))
        } else if (res.Error === 'Movie not found!') {
          reject({
            type: Errors.NotFound,
            message: `Couldn't find a movie that matched ${searchQuery}.`,
          })
        } else {
          reject({
            type: Errors.TooManyResults,
            message: `Found too many movies. Try typing a more specific movie title.`,
          })
        }
      })
  })
}

function parseMovie(movieResult: MovieResult): Movie {
  return {
    title: movieResult.Title,
    year: movieResult.Year,
    id: movieResult.imdbID,
    type: movieResult.Type,
    poster: movieResult.Poster === 'N/A' ? null : movieResult.Poster,
  }
}
