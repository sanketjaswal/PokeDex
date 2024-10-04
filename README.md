# Pokedex

###Overview

The Pokedex Application is a React-based web application that allows users to view detailed information about various Pokémon. The app provides features such as filtering Pokémon by type and searching by name. It uses the Pokémon API for fetching data and includes responsive UI components to display Pokémon abilities, stats, and more.


### Application Link

```bash
https://sanketjaswal.github.io/PokeDex
```


## Features

- **Pokemon Listing**: View a list of Pokemon with basic details.
- **Pokemon Details**: Click on a Pokemon to view detailed information.
- **Filtering**: Filter Pokemon by Pokemon type.
- **Searching**: Search for specific Pokemon by name.
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
npm start
```


## Dependencies
Below is a list of dependencies used in the project:
- **React**: Frontend library for building user interfaces.
- **TypeScript**: For static type checking and enhancing code quality.
- **Pokémon API**: Integration with an external API to fetch Pokemon data.
- **Axios**: For making API requests to retrieve Pokemon data.
- **React Router**: For client-side routing within the application.
- **Styled-Components**: For creating styled React components with scoped CSS.
- **gh-pages**: For deploying the application to GitHub Pages.
- **State Management**: Using React's state and possibly Context API or Redux for managing application state.

  
## Features

### Pokémon Data
- Data is fetched from the Pokémon API using Axios in an asynchronous function (e.g., useEffect for initial load). Once the data is received, it's stored in state (e.g., using useState), and then passed as props to components that display the Pokémon details.
- Displays Pokémon details fetched from the Pokémon API, including:
    - Abilities
    - Types
    - Pokemon images
    - Deescription
    - Base Stats
    - Height and Weight

### Pokémon Search
- Users can search for specific Pokémon by name using the search bar.
- To implement search functionality that triggers on entering a single key, you can use the onChange event on the input field to capture user input. As the user types, filter the Pokémon list by checking if the Pokémon   name includes the input string using JavaScript's includes() method, updating the displayed results dynamically.

### Pokémon Filters
- Users can filter Pokémon by type (e.g., Fire, Water, Grass).
- To implement filtering by type, call the Pokémon API with the selected type as a query parameter (e.g., /api/v2/type/{type}). Upon selection, use onChange to trigger an API call, retrieve the Pokémon filtered by that type, and update the list accordingly.


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

```shell
npm run deploy
```

