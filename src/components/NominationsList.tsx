import React from 'react'
import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { Card, Button, Stack, Caption } from '@shopify/polaris'
import styled from 'styled-components'

import type { Nominations } from '../services/nominations'

type NominationsListProps = {
  nominations: Nominations
  animate?: boolean
}

const variants: Variants = {
  enter: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: 10,
  },
}

export default function NominationsList({
  nominations,
  animate = false,
}: NominationsListProps) {
  const count = Object.keys(nominations.movies).length
  if (count === 0) {
    return (
      <Card.Section>
        <Heading>Nominations</Heading>
        <motion.p layout>There are no nominations yet.</motion.p>
      </Card.Section>
    )
  }

  return (
    <Card.Section>
      <Heading>Nominations</Heading>
      <motion.ul className="Polaris-List">
        {Object.values(nominations.movies).map((movie) => (
          <motion.li
            key={movie.id}
            className="Polaris-List__Item"
            variants={variants}
            animate="enter"
            layout={animate}
          >
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
          </motion.li>
        ))}
      </motion.ul>
    </Card.Section>
  )
}

const Heading = styled(motion.h2).attrs({
  className: 'Polaris-Heading',
  layout: true,
})`
  margin-bottom: 16px;
`
