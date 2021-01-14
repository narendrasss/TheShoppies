import React from 'react'
import styled from 'styled-components'
import { useDebouncedCallback } from 'use-debounce'
import {
  Card,
  List,
  Button,
  Stack,
  Caption,
  Heading,
  SkeletonBodyText,
  EmptyState,
} from '@shopify/polaris'

import getMovies, { Movie } from '../services/movies'
import type { Nominations } from '../services/nominations'
import emptySearch from '../assets/empty-search.svg'

import Spacing from './Spacing'

const DEBOUNCE_DELAY = 650

export default function MovieResults({
  searchValue,
  nominations,
  onStartSearch = () => {},
}: {
  searchValue: string
  nominations: Nominations
  onStartSearch: () => void
}) {
  const [movies, setMovies] = React.useState<Movie[]>([])
  const [isLoading, setLoading] = React.useState(false)
  const debounced = useDebouncedCallback(() => {
    getMovies(searchValue).then((results) => {
      setLoading(false)
      setMovies(results)
    })
  }, DEBOUNCE_DELAY)

  React.useEffect(() => {
    if (searchValue.length) {
      setLoading(true)
      debounced.callback()
    } else {
      setLoading(false)
      setMovies([])
    }
    return () => debounced.cancel()
  }, [searchValue])

  if (!searchValue.length) {
    return (
      <Card.Section>
        <Spacing>
          <Heading>Movies</Heading>
        </Spacing>
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
      <Spacing>
        <Heading>Results for "{searchValue}"</Heading>
      </Spacing>
      {isLoading ? (
        <SkeletonBodyText lines={5} />
      ) : (
        <List>
          {movies.map((movie) => (
            <List.Item key={movie.id}>
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
