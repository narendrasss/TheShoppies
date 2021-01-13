import React from 'react'

// TODO: Change this to .env
const API_KEY = '1ba7ba79'

export type Movie = {
  title: string
  year: number
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

const mock = {
  Search: [
    {
      Title: 'Rambo',
      Year: '2008',
      imdbID: 'tt0462499',
      Type: 'movie',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BMTI5Mjg1MzM4NF5BMl5BanBnXkFtZTcwNTAyNzUzMw@@._V1_SX300.jpg',
    },
    {
      Title: 'Rambo: First Blood Part II',
      Year: '1985',
      imdbID: 'tt0089880',
      Type: 'movie',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BZWFkY2I1ZDAtNmZhNS00NjVlLWJiMGQtMGQ1ZmM0ZDA5ODg5XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
    },
    {
      Title: 'Rambo III',
      Year: '1988',
      imdbID: 'tt0095956',
      Type: 'movie',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BNGM5ZWZiODEtMTIyYy00ZDYyLWE0M2EtMTgzZDViY2EzNjU4XkEyXkFqcGdeQXVyMjMwNDgzNjc@._V1_SX300.jpg',
    },
    {
      Title: 'Rambo: Last Blood',
      Year: '2019',
      imdbID: 'tt1206885',
      Type: 'movie',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BNTAxZWM2OTgtOTQzOC00ZTI5LTgyYjktZTRhYWM4YWQxNWI0XkEyXkFqcGdeQXVyMjMwNDgzNjc@._V1_SX300.jpg',
    },
    {
      Title: 'Rambo',
      Year: '1986',
      imdbID: 'tt0222619',
      Type: 'series',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BZDQ0M2M2MjktMmViYy00MDM5LWE1NWEtZmRhNzZmMGM3MzkxXkEyXkFqcGdeQXVyMjY3MjUzNDk@._V1_SX300.jpg',
    },
    {
      Title: 'Rambo III',
      Year: '1989',
      imdbID: 'tt0301766',
      Type: 'game',
      Poster: 'N/A',
    },
    {
      Title: 'Rambo: First Blood Part II',
      Year: '1986',
      imdbID: 'tt0301768',
      Type: 'game',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BNzRmM2EwYzAtZTMzNC00ZDg5LWE5YzktOWM5NTk4OGJhYWM4XkEyXkFqcGdeQXVyMjY3MjUzNDk@._V1_SX300.jpg',
    },
    {
      Title: 'Rambo',
      Year: '2012',
      imdbID: 'tt3107798',
      Type: 'movie',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BNDUwOGYwYWUtZjMzNi00MDIwLWE2NjgtYTdhODJmMTQwMGMyXkEyXkFqcGdeQXVyMzQzMDc2MDk@._V1_SX300.jpg',
    },
    {
      Title: 'Rambo',
      Year: '1987',
      imdbID: 'tt0301765',
      Type: 'game',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BYmMxZGVjYzYtNWY4ZC00ZjAwLWFjNWQtOWFjNGEzNDQ2ZDM3XkEyXkFqcGdeQXVyMTgwOTE5NDk@._V1_SX300.jpg',
    },
    {
      Title: 'Rambo: The Video Game',
      Year: '2014',
      imdbID: 'tt4291054',
      Type: 'game',
      Poster: 'N/A',
    },
  ],
  totalResults: '44',
  Response: 'True',
}

export default function useMovies(searchQuery: string) {
  const [movies, setMovies] = React.useState<Movie[]>([])

  React.useEffect(() => {
    if (searchQuery.length) {
      getMovies(searchQuery).then(setMovies)
    } else {
      setMovies([])
    }
  }, [searchQuery])

  return movies
}

function getMovies(searchQuery: string): Promise<Movie[]> {
  /* return new Promise((resolve, reject) => {
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
  }) */
  return Promise.resolve(mock.Search.map(parseMovie))
}

function parseMovie(movieResult: MovieResult): Movie {
  return {
    title: movieResult.Title,
    year: Number(movieResult.Year),
    id: movieResult.imdbID,
    type: movieResult.Type,
    poster: movieResult.Poster === 'N/A' ? null : movieResult.Poster,
  }
}
