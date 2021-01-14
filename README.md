# Shopify Frontend Internship Challenge - Summer 2021

![The Shoppies demo video](demo.gif)

<p align="center">
A small web app to nominate your favourite movies for the upcoming The Shoppies award show 🎉
</p>

## Getting Started

1. Clone the repo — `git clone https://github.com/narendrasss/TheShoppies`
2. Install dependencies — `yarn install`
3. Add a `.env.local` file in the root directory with the [OMDb API](http://www.omdbapi.com/) key:

```
/.env.local

REACT_APP_OMDB_API_KEY=my_api_key
```

4. Start the app — `yarn start`
5. Run tests — `yarn test`

## Features

### Technical Requirements

- Search for movies using the OMDb API
- Nominate your favourite movies
- Limit nominations to five movies, and show a banner when the user's done

### Extras

- **Responsive** — The app was built mobile-first with a responsive design. For mobile users, I created a slightly modified design using tabs to improve user experience.
- **Micro-interactions** — I added various micro-interactions to make the app feel more smooth. This includes loading animations and an animation when a movie is nominated or removed.
- **Polaris** — As much as possible I used Shopify's Polaris component library to build the markup. For custom components, I made sure to style them so they don't look out of place.
- **100% statement coverage** — I added a comprehensive integration testing suite using [react testing library](https://testing-library.com/docs/react-testing-library/intro/) and [Jest](https://jestjs.io/) to ensure the app is accessible and works well.

My approach to this challenge revolved around four key principles I believe the app should be — mobile-first, accessible, user-centric, and thoroughly tested.

- Custom hooks
- Debouncing
  - To minimize # of API calls

## Technologies and Architecture

For development speed I stuck with technologies I was comfortable with, namely **Create-React-App** and **TypeScript** for development, and Vercel for deployment.

### Dependencies

**Runtime Dependencies**

| Package                                      | Purpose                                                                                                                                                            |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `react`, `react-dom`, `react-scripts`        | Primary front-end framework and associated tooling.                                                                                                                |
| `@shopify/polaris`, `@shopify/polaris-icons` | Component library to match Shopify design.                                                                                                                         |
| `styled-components`                          | CSS-in-JS library, personal preference and have used multiple times in other projects.                                                                             |
| `framer-motion`                              | React animation library. Chosen over other options because of its declarative API and experience with using it.                                                    |
| `use-debounce`                               | Custom React hook to debounce a function. I didn't feel it was necessary to write my own debounce function — the package has a nice API and is extensively tested. |

**Development Dependencies**

| Package              | Purpose                                                                                                                                                                        |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| TypeScript           | Who doesn't love static typing? TS also works very well with React.                                                                                                            |
| Prettier             | Automatic code formatting for consistency throughout the codebase.                                                                                                             |
| `@testing-library/*` | Various packages for integration tests. I chose this over a library like `enzyme` because it enforces a11y best practices and allows you to write very robust front-end tests. |

The following packages came with create-react-app, but I thought it would be useful to mention them as well:

| Package | Purpose                                                           |
| ------- | ----------------------------------------------------------------- |
| Eslint  | Code linter, ensures code abides by best practices.               |
| Jest    | Comprehensive test runner with support for mocks and async tests. |

### Architecture

### Trade-Offs

## Extensions/Improvements

- Performance
- Better use of Polaris
- Developer workflow improvements
