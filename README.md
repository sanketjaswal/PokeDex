# PokéDex

### Overview

The Pokédex Application is a React web application that allows users to view detailed information about various Pokémons. The app provides features such as filtering Pokémons by type and searching by name. It uses the [PokéAPI](https://pokeapi.co/) for fetching data and includes responsive UI components to display Pokémon's abilities, stats, and more.

## Application Link

[https://sanketjaswal.github.io/PokeDex](https://sanketjaswal.github.io/PokeDex)

## Features

- **Listing**: View a list of Pokemon with basic details.
- **Details**: Click on a Pokemon to view detailed information.
- **Filtering**: Filter Pokemon by Pokemon type.
- **Searching**: Search for specific Pokemon by name.
- **Pagination**: Divides content into pages for better user experience.
- **Responsive Design**: The layout adapts seamlessly to different screen sizes.
- **Custom Pokemons**: Custom pokemons to the search.

## Setup Instructions

### 1. Clone the repository

```shell
git clone https://github.com/sanketjaswal/PokeDex.git
cd PokeDex
```

### 2. Install dependencies

```shell
npm install
```

### 3. Start the application

```shell
npm start
```

This will run the app in development mode in http://localhost:3000.

### 4. Build for production

```shell
npm run build
```

## Dependencies

Below is a list of dependencies used in the project:

- **[React](https://www.npmjs.com/package/react)**: Frontend library for building user interfaces.
- **[TypeScript](https://www.npmjs.com/package/typescript)**: For static type checking and enhancing code quality.
- **[PokéAPI](https://pokeapi.co/)**: Integration with an external API to fetch Pokemon data.
- **[Axios](https://www.npmjs.com/search?q=axios)**: For making API requests to retrieve Pokemon data.
- **[React Router](https://www.npmjs.com/package/react-router-dom)**: For client-side routing within the application.
- **[Styled-Components](https://www.npmjs.com/package/styled-components)**: For creating styled React components with scoped CSS.
- **[gh-pages](https://www.npmjs.com/search?q=ghpages)**: For deploying the application to GitHub Pages.
- **[Eslint](https://www.npmjs.com/package/eslint)**: ESLint tool used to detects and fixes JavaScript code issues.
- **[Prettier](https://www.npmjs.com/package/prettier)**: For code formatterinf with consistent styling.

## Features Working

### Pokémon Data

- Pokemon data is fetched from the [PokéAPI](https://pokeapi.co/) using Axios in an asynchronous function (useEffect for initial load). Once the data is received, it's stored in state (using useState), and then passed as props to components that display the Pokémon details.
- Displays Pokémon details fetched from the Pokémon API, including:
  - Abilities
  - Types
  - Pokemon images
  - Description
  - Base Stats
  - Height and Weight

### Pokémon Search

- Users can search for specific Pokémon by name using the search bar.
- To implement search functionality that triggers on entering a single key, you can use the onChange event on the input field to capture user input. As the user types, filter the Pokémon list by checking if the Pokémon name includes the input string using JavaScript's includes() method, updating the displayed results dynamically.

### Filters

- Users can filter Pokémon by type (e.g., Fire, Water, Grass).
- To implement filtering by type, call the [PokéAPI](https://pokeapi.co/) with the selected type as a query parameter ([PokéAPI](https://pokeapi.co/)/api/v2/type/{type}). Upon selection, use onChange to trigger an API call, retrieve the Pokémon filtered by that type, and update the list accordingly.

### Pagination

- All data is first called and saved in a state.
- To implement pagination the next set of the data is fetched form saved data and concatianted to the Pokemon data.

## Code Structure

```shell
/src
  ├── /components                   # Includes  components for application
  |
  ├── /pages                        # Includes pages to be shown
  │   └── Home.tsx                  # Page to show Pokemon details
  |
  ├── /models                       # Data models for pokemon Api
  │   └── index.ts
  │
  ├── /apis                         # All apis to be used in application
  │
  ├── /theme                        # Theme file contains themes for application
  │
  ├── App.tsx                       # Main component that houses the layout
  └── App.css                       # Global CSS file
```

## Deployment

The below command is used to deploy the application. It triggers the deployment of your application to GitHub Pages using the gh-pages package. It pushes the built project files to the gh-pages branch of your repository, making your app accessible via GitHub Pages.

```shell
npm run deploy
```

# Conclusion

The Pokédex Application offers an engaging way to explore and interact with Pokémon data through an intuitive user interface. With features like search and filters, users can personalize their experience.
