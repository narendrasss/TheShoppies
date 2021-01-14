import React from 'react'
import styled from 'styled-components'
import {
  Page,
  Layout,
  Card,
  Form,
  TextField,
  Icon,
  Tabs,
  Badge,
  Banner,
} from '@shopify/polaris'
import { SearchMinor } from '@shopify/polaris-icons'

import NominationsList from './components/NominationsList'
import MovieResults from './components/MovieResults'
import Spacing from './components/Spacing'
import useNominations from './services/nominations'

function App() {
  const [activeTabIndex, setActiveTabIndex] = React.useState(0)
  const [searchValue, setSearchValue] = React.useState('')
  const [focused, setFocused] = React.useState(false)
  const nominations = useNominations()

  return (
    <Main>
      <Page title="The Shoppies">
        <Layout>
          <Layout.Section>
            <p>
              Search for your favourite movies and nominate up to 5 of them for
              the upcoming Shoppies award show!
            </p>
          </Layout.Section>
          <Layout.Section>
            <Card sectioned>
              <Spacing>
                <Form onSubmit={() => {}}>
                  <TextField
                    focused={focused}
                    label="Movie Title"
                    type="search"
                    placeholder="Search for a movie title"
                    value={searchValue}
                    onChange={setSearchValue}
                    prefix={<Icon source={SearchMinor} />}
                    onBlur={() => setFocused(false)}
                  />
                </Form>
              </Spacing>
              {nominations.full && (
                <Banner title="Thanks for your nominations!" status="success">
                  <p>
                    If you've made a mistake, remove one of your nominations and
                    add another.
                  </p>
                </Banner>
              )}
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
                <MovieResults
                  searchValue={searchValue}
                  nominations={nominations}
                  onStartSearch={() => setFocused(true)}
                />
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

export default App

const Main = styled.main`
  padding: 16px;
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
