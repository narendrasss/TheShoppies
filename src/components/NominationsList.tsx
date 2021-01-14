import React from 'react'
import { Card, List, Button, Stack, Caption, Heading } from '@shopify/polaris'

import type { Nominations } from '../services/nominations'

import Spacing from './Spacing'

type NominationsListProps = {
  nominations: Nominations
}

export default function NominationsList({ nominations }: NominationsListProps) {
  const count = Object.keys(nominations.movies).length
  if (count === 0) {
    return (
      <Card.Section>
        <Spacing>
          <Heading>Nominations</Heading>
        </Spacing>
        <p>There are no nominations yet.</p>
      </Card.Section>
    )
  }

  return (
    <Card.Section>
      <Spacing>
        <Heading>Nominations</Heading>
      </Spacing>
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
