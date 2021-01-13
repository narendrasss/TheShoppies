import React from 'react'
import { useDebounce } from 'use-debounce'
import './App.css'

import getMovies from './services/movies'
import type { Movie } from './services/movies'

function App() {
  const [searchValue, setSearchValue] = React.useState('')
  const [debouncedSearch] = useDebounce(searchValue, 1000)

  const [results, setResults] = React.useState<Movie[]>([])
  const [nominations, setNominations] = React.useState<Record<string, Movie>>(
    {}
  )

  React.useEffect(() => {
    if (debouncedSearch.length) {
      getMovies(debouncedSearch).then(setResults)
    } else {
      setResults([])
    }
  }, [debouncedSearch])

  return (
    <main>
      <h1>The Shoppies</h1>
      <form>
        <label htmlFor="movie-title">Movie title</label>
        <input
          id="movie-title"
          name="movieTitle"
          type="search"
          placeholder="Search for a movie title"
          value={searchValue}
          onChange={(evt) => setSearchValue(evt.target.value)}
        />
      </form>
      <section>
        <h1>Results for {searchValue}</h1>
        <ul>
          {results.map((movie) => (
            <li key={movie.id}>{movie.title}</li>
          ))}
        </ul>
      </section>
      <section>
        <h1>Nominations</h1>
        <ul>
          {Object.values(nominations).map((movie) => (
            <li key={movie.id}>{movie.title}</li>
          ))}
        </ul>
      </section>
    </main>
  )
}

export default App
