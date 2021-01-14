import React from 'react'
import styled from 'styled-components'
import {
  Page,
  Layout,
  Form,
  TextField,
  Icon,
  Badge,
  Banner,
  Card,
} from '@shopify/polaris'
import { motion } from 'framer-motion'
import { SearchMinor } from '@shopify/polaris-icons'

import NominationsList from './components/NominationsList'
import MovieResults from './components/MovieResults'
import Tabs from './components/Tabs'
import useNominations from './services/nominations'

const TabNames = {
  Results: 'results',
  Nominations: 'nominations',
}

export default function ShoppiesSearch() {
  const [activeTab, setActiveTab] = React.useState(TabNames.Results)
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
              <FormContainer>
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
              </FormContainer>
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
                <Tabs selected={activeTab} onSelect={setActiveTab}>
                  <Tabs.Tab id={TabNames.Results}>Results</Tabs.Tab>
                  <Tabs.Tab id={TabNames.Nominations}>
                    <span>
                      Nominations{' '}
                      <Badge size="small">
                        {`${Object.values(nominations.movies).length}`}
                      </Badge>
                    </span>
                  </Tabs.Tab>
                </Tabs>
              </TabsContainer>
              {activeTab === TabNames.Results ? (
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
            <NominationsCard className="Polaris-Card" layout>
              <NominationsList nominations={nominations} animate />
            </NominationsCard>
          </Layout.Section>
        </Layout>
      </Page>
    </Main>
  )
}

const Main = styled.main`
  padding: 16px;
`

const TabsContainer = styled.section`
  @media screen and (min-width: 1024px) {
    display: none;
  }
`

const NominationsCard = styled(motion.section).attrs({
  className: 'Polaris-Card',
  'data-testid': 'nominations',
})`
  display: none;

  @media screen and (min-width: 1024px) {
    display: block;
  }
`

const FormContainer = styled.div`
  margin-bottom: 16px;
`
