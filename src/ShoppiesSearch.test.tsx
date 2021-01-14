import { screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import getMovies from './services/movies'
import { render } from './test/utils'
import ShoppiesSearch from './ShoppiesSearch'

jest.mock('./services/movies')

// -- Utils

const getNominateButton = (element: HTMLElement) =>
  within(element).getByRole('button', { name: /nominate/i })

const nominate = (element: HTMLElement) =>
  userEvent.click(getNominateButton(element))

const setup = async () => {
  render(<ShoppiesSearch />)
  const search = screen.getByLabelText(/movie title/i)
  userEvent.type(search, 'ram')

  screen.getByText(/results for/i)
  await waitFor(() => screen.getAllByText(/rambo/i))
}

// -- Specs

describe('Shoppies', () => {
  it('should be able to see movies and nominate them', async () => {
    await setup()
    screen.getByText(/no nominations/i)
    nominate(screen.getByTestId('Rambo 1'))

    // Should appear in nominations
    within(screen.getByTestId('nominations')).getByText('Rambo 1')
    expect(getNominateButton(screen.getByTestId('Rambo 1'))).toBeDisabled()

    // Should be able to remove a nomination
    userEvent.click(
      within(screen.getByTestId('nominations')).getByText(/remove/i)
    )
    screen.getByText(/no nominations/i)
  })

  it('should show a banner when 5 movies are nominated', async () => {
    await setup()

    for (let i = 1; i <= 5; i++) {
      nominate(screen.getByTestId(`Rambo ${i}`))
    }
    screen.getByText(/thanks for your nominations/i)

    // Sixth movie should have its nomination button disabled
    expect(getNominateButton(screen.getByTestId('Rambo 6'))).toBeDisabled()
  })

  it('should focus on search input when search for movie is pressed', () => {
    render(<ShoppiesSearch />)
    userEvent.click(screen.getByRole('button', { name: /search for a movie/i }))

    expect(document.activeElement).toEqual(
      screen.getByLabelText(/movie title/i)
    )
  })

  it('should show error message if API errors out', async () => {
    const message = 'Too many movies!'
    // @ts-ignore
    getMovies.mockImplementationOnce(() => Promise.reject({ message }))

    render(<ShoppiesSearch />)
    const search = screen.getByLabelText(/movie title/i)
    userEvent.type(search, 'ram')

    await waitFor(() => screen.getByText(message))
  })
})
