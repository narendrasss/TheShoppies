import React from 'react'
import { useDebounce } from 'use-debounce'
import './App.css'

const API_KEY = '1ba7ba79'

type Movie = {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}

const getMovies = (search: string) =>
  fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`)
    .then((res) => res.json())
    .then((res) => {
      if (res.Response === 'True') {
        return res.Search
      } else {
        return []
      }
    })

function App() {
  const [searchValue, setSearchValue] = React.useState('')
  const [debouncedSearch] = useDebounce(searchValue, 1000)

  const [results, setResults] = React.useState<Movie[]>([])
  const [nominations, setNominations] = React.useState<Movie[]>([])

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
            <li key={movie.imdbID}>{movie.Title}</li>
          ))}
        </ul>
      </section>
      <section>
        <h1>Nominations</h1>
        <ul>
          {nominations.map((movie) => (
            <li key={movie.imdbID}>{movie.Title}</li>
          ))}
        </ul>
      </section>
    </main>
  )
}

export default App
