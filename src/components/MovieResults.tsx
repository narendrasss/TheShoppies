import React from 'react'
import styled from 'styled-components'
import { useDebouncedCallback } from 'use-debounce'
import {
  Card,
  List,
  Button,
  Stack,
  Caption,
  SkeletonBodyText,
  EmptyState,
} from '@shopify/polaris'

import getMovies, { Movie } from '../services/movies'
import type { Nominations } from '../services/nominations'
import emptySearch from '../assets/empty-search.svg'

import Heading from './Heading'

const DEBOUNCE_DELAY = 650

type MovieResultsProps = {
  searchValue: string
  nominations: Nominations
  onStartSearch: () => void
}

/**
 * Fetches and displays a list of movie results given a `searchValue`. Also requires
 * a `nominations` prop so movies can be nominated and so they know if they should
 * be disabled.
 */
export default function MovieResults({
  searchValue,
  nominations,
  onStartSearch = () => {},
}: MovieResultsProps) {
  const [movies, setMovies] = React.useState<Movie[]>([])
  const [isLoading, setLoading] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null)

  const debounced = useDebouncedCallback(() => {
    getMovies(searchValue)
      .then((results) => {
        setLoading(false)
        setMovies(results)
      })
      .catch(({ message }) => {
        setLoading(false)
        setErrorMessage(message)
      })
  }, DEBOUNCE_DELAY)

  React.useEffect(() => {
    if (searchValue.length) {
      setLoading(true)
      setErrorMessage(null)
      debounced.callback()
    } else {
      setLoading(false)
      setErrorMessage(null)
      setMovies([])
    }
    return () => debounced.cancel()
  }, [searchValue, debounced])

  if (!searchValue.length) {
    return (
      <Card.Section>
        <Heading>Movies</Heading>
        <NoSearch>
          <EmptyState
            image={emptySearch}
            imageContained
            heading="Type a movie name to get started."
            action={{ content: 'Search for a movie', onAction: onStartSearch }}
          />
        </NoSearch>
      </Card.Section>
    )
  }

  return (
    <Card.Section>
      <Heading>Results for "{searchValue}"</Heading>
      {isLoading ? (
        <SkeletonBodyText lines={5} />
      ) : errorMessage ? (
        <p>{errorMessage}</p>
      ) : (
        <List>
          {movies.map((movie) => (
            <List.Item key={movie.id}>
              <div data-testid={movie.title}>
                <Stack alignment="center" wrap={false}>
                  <Stack.Item fill>
                    {movie.title} <Caption>{movie.year}</Caption>
                  </Stack.Item>
                  <Stack.Item>
                    <Button
                      size="slim"
                      onClick={() => nominations.add(movie)}
                      disabled={nominations.has(movie) || nominations.full}
                    >
                      Nominate
                    </Button>
                  </Stack.Item>
                </Stack>
              </div>
            </List.Item>
          ))}
        </List>
      )}
    </Card.Section>
  )
}

const NoSearch = styled.div`
  width: 80%;
  margin-left: auto;
  margin-right: auto;

  img {
    max-width: 100%;
  }

  @media screen and (min-width: 768px) {
    width: 60%;
  }
`
