import React from 'react'
import styled from 'styled-components'
import { useDebounce } from 'use-debounce'
import {
  Page,
  Layout,
  Card,
  List,
  Button,
  Stack,
  Caption,
  Form,
  TextField,
  Icon,
  Tabs,
  Heading,
  Badge,
} from '@shopify/polaris'
import { SearchMinor } from '@shopify/polaris-icons'

import useMovies from './services/movies'
import useNominations from './services/nominations'
import type { Nominations } from './services/nominations'

const DELAY = 1000

function App() {
  const [activeTabIndex, setActiveTabIndex] = React.useState(0)
  const [searchValue, setSearchValue] = React.useState('')
  const [debouncedSearch] = useDebounce(searchValue, DELAY)

  const movies = useMovies(debouncedSearch)
  const nominations = useNominations()

  return (
    <Main>
      <Page title="The Shoppies">
        <Layout>
          <Layout.Section>
            <Card sectioned>
              <Form onSubmit={() => {}}>
                <TextField
                  label="Movie Title"
                  type="search"
                  placeholder="Search for a movie title"
                  value={searchValue}
                  onChange={setSearchValue}
                  prefix={<Icon source={SearchMinor} />}
                />
              </Form>
            </Card>
          </Layout.Section>
          <Layout.Section oneHalf>
            <Card>
              <TabsContainer>
                <Tabs
                  tabs={[
                    { id: 'results', content: <span>Results</span> },
                    {
                      id: 'nominations',
                      content: (
                        <span>
                          Nominations{' '}
                          <Badge size="small">
                            {`${Object.values(nominations.movies).length}`}
                          </Badge>
                        </span>
                      ),
                    },
                  ]}
                  selected={activeTabIndex}
                  onSelect={setActiveTabIndex}
                  fitted
                />
              </TabsContainer>
              {activeTabIndex === 0 ? (
                <Card.Section>
                  <MovieCardTitle>
                    <Heading>Results for "{searchValue}"</Heading>
                  </MovieCardTitle>
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
                              disabled={nominations.has(movie)}
                            >
                              Nominate
                            </Button>
                          </Stack.Item>
                        </Stack>
                      </List.Item>
                    ))}
                  </List>
                </Card.Section>
              ) : (
                <NominationsList nominations={nominations} />
              )}
            </Card>
          </Layout.Section>
          <Layout.Section oneHalf>
            <NominationsColumn>
              <Card>
                <NominationsList nominations={nominations} />
              </Card>
            </NominationsColumn>
          </Layout.Section>
        </Layout>
      </Page>
    </Main>
  )
}

function NominationsList({ nominations }: { nominations: Nominations }) {
  return (
    <Card.Section>
      <MovieCardTitle>
        <Heading>Nominations</Heading>
      </MovieCardTitle>
      <List>
        {Object.values(nominations.movies).map((movie) => (
          <List.Item key={movie.id}>
            <Stack alignment="center" wrap={false}>
              <Stack.Item fill>
                {movie.title} <Caption>{movie.year}</Caption>
              </Stack.Item>
              <Stack.Item>
                <Button size="slim" onClick={() => nominations.remove(movie)}>
                  Remove
                </Button>
              </Stack.Item>
            </Stack>
          </List.Item>
        ))}
      </List>
    </Card.Section>
  )
}

export default App

const Main = styled.main`
  padding: 16px;
`

const MovieCardTitle = styled.header`
  margin-bottom: 16px;
`

const TabsContainer = styled.section`
  @media screen and (min-width: 1024px) {
    display: none;
  }
`

const NominationsColumn = styled.section`
  display: none;

  @media screen and (min-width: 1024px) {
    display: block;
  }
`
