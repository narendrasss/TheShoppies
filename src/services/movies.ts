// TODO: Change this to .env
const API_KEY = '1ba7ba79'

export type Movie = {
  title: string
  year: number
  id: string
  type: string
  poster: string
}

type MovieResult = {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}

export default function getMovies(query: string): Promise<Movie[]> {
  return new Promise((resolve, reject) => {
    fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.Response === 'True') {
          return resolve(res.Search.map(parseMovie))
        } else {
          // TODO: Reject in this case
          return resolve([])
        }
      })
  })
}

function parseMovie(movieResult: MovieResult): Movie {
  return {
    title: movieResult.Title,
    year: Number(movieResult.Year),
    id: movieResult.imdbID,
    type: movieResult.Type,
    poster: movieResult.Poster,
  }
}
