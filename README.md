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

## Features 🎊

### Technical Requirements

- Search for movies using the OMDb API
- Nominate your favourite movies
- Limit nominations to five movies, and show a banner when the user's done

### Extras

- **Responsive** — The app was built mobile-first with a responsive design. For mobile users, I created a slightly modified design using tabs to improve user experience.
- **Micro-interactions** — I added various micro-interactions to make the app feel more smooth. This includes loading animations and an animation when a movie is nominated or removed.
- **Polaris** — As much as possible I used Shopify's Polaris component library to build the markup. For custom components, I made sure to style them so they don't look out of place.
- **100% statement coverage** — I added a comprehensive integration testing suite using [react testing library](https://testing-library.com/docs/react-testing-library/intro/) and [Jest](https://jestjs.io/) to ensure the app is accessible and works well.

## Considerations 🏗

### Minimize API calls

I structured the app to **minimize the number of API calls**. For myself this means I'm not likely to be blocked by OMDb's daily rate limit, and for a company like Shopify, this means lower costs from vendors who charge on a per-request basis. At the same time I wanted the results to update in real time as I type for a seamless experience.

To do this, I added a `useEffect` that makes requests as the user types. This call is _debounced_, meaning it only runs once the user stops typing for a set amount of time. See [the code here](src/components/MovieResults.tsx).

The trade-off here is there's no immediate feedback and there's a slight delay when the user stops typing.

### Composition

I wanted the components to be as composable as possible. Having composable components means building future screens is straightforward and requires minimal changes. Using Polaris, most of the components already are, however I wanted the custom components to follow a similar API.

For the [Tabs component](src/components/Tabs.tsx), I designed an API that allows users to add their own `Tab`s as children. This means the component itself is only responsible for maintaining the active state, with little opinion on how it should be presented.

The trade-off here is that the complexity is swallowed up by the `Tabs` component, meaning the implementation is more complex than if `Tabs` just accepted the names as a prop.

## Technologies 🛠

For development speed I stuck with technologies I was comfortable with, namely **Create-React-App** and **TypeScript** for development, and Vercel for deployment. For a complete list of packages, see the table below.

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

## Trade-Offs

## Extensions/Improvements 🤔

- Performance
- Better use of Polaris
- Developer workflow improvements
