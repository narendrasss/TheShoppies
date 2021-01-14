type Movie = {
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

function parseMovie(movieResult: MovieResult): Movie {
  return {
    title: movieResult.Title,
    year: movieResult.Year,
    id: movieResult.imdbID,
    type: movieResult.Type,
    poster: movieResult.Poster === 'N/A' ? null : movieResult.Poster,
  }
}

const mock = {
  Search: [
    {
      Title: 'Rambo 1',
      Year: '2008',
      imdbID: 'tt0462499',
      Type: 'movie',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BMTI5Mjg1MzM4NF5BMl5BanBnXkFtZTcwNTAyNzUzMw@@._V1_SX300.jpg',
    },
    {
      Title: 'Rambo 2',
      Year: '1985',
      imdbID: 'tt0089880',
      Type: 'movie',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BZWFkY2I1ZDAtNmZhNS00NjVlLWJiMGQtMGQ1ZmM0ZDA5ODg5XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
    },
    {
      Title: 'Rambo 3',
      Year: '1988',
      imdbID: 'tt0095956',
      Type: 'movie',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BNGM5ZWZiODEtMTIyYy00ZDYyLWE0M2EtMTgzZDViY2EzNjU4XkEyXkFqcGdeQXVyMjMwNDgzNjc@._V1_SX300.jpg',
    },
    {
      Title: 'Rambo 4',
      Year: '1988',
      imdbID: 'tt0095957',
      Type: 'movie',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BNGM5ZWZiODEtMTIyYy00ZDYyLWE0M2EtMTgzZDViY2EzNjU4XkEyXkFqcGdeQXVyMjMwNDgzNjc@._V1_SX300.jpg',
    },
    {
      Title: 'Rambo 5',
      Year: '1988',
      imdbID: 'tt0095958',
      Type: 'movie',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BNGM5ZWZiODEtMTIyYy00ZDYyLWE0M2EtMTgzZDViY2EzNjU4XkEyXkFqcGdeQXVyMjMwNDgzNjc@._V1_SX300.jpg',
    },
    {
      Title: 'Rambo 6',
      Year: '1988',
      imdbID: 'tt0095959',
      Type: 'movie',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BNGM5ZWZiODEtMTIyYy00ZDYyLWE0M2EtMTgzZDViY2EzNjU4XkEyXkFqcGdeQXVyMjMwNDgzNjc@._V1_SX300.jpg',
    },
  ],
  totalResults: '44',
  Response: 'True',
}

export default jest.fn(() => Promise.resolve(mock.Search.map(parseMovie)))
