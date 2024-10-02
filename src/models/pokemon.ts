// a single Pokémon type
export interface ListPokemon {
  name: string;
  url: string;
}

// Result of Pokemon list API
export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: ListPokemon[];
}
