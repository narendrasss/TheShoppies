import React from 'react'
import type { Movie } from './movies'

export type Nominations = {
  movies: Record<string, Movie>
  add: (movie: Movie) => void
  remove: (movie: Movie) => void
  has: (movie: Movie) => boolean
}

export default function useNominations(): Nominations {
  const [movies, setMovies] = React.useState<Record<string, Movie>>({})

  const add = (movie: Movie) => {
    setMovies({ ...movies, [movie.id]: movie })
  }

  const remove = (movie: Movie) => {
    delete movies[movie.id]
    setMovies({ ...movies })
  }

  const has = (movie: Movie) => {
    return movies.hasOwnProperty(movie.id)
  }

  return { movies, add, remove, has }
}
