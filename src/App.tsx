import React from 'react'
import { useDebounce } from 'use-debounce'
import './App.css'

import useMovies from './services/movies'
import useNominations from './services/nominations'

const DELAY = 1000

function App() {
  const [searchValue, setSearchValue] = React.useState('')
  const [debouncedSearch] = useDebounce(searchValue, DELAY)

  const movies = useMovies(debouncedSearch)
  const nominations = useNominations()

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
          {movies.map((movie) => (
            <li key={movie.id}>
              <h1>{movie.title}</h1>
              <button
                onClick={() => nominations.add(movie)}
                disabled={nominations.has(movie)}
              >
                Nominate
              </button>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h1>Nominations</h1>
        <ul>
          {Object.values(nominations.movies).map((movie) => (
            <li key={movie.id}>
              <h1>{movie.title}</h1>
              <button onClick={() => nominations.remove(movie)}>Remove</button>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}

export default App
