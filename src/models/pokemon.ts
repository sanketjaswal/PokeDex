// a single Pokémon type
export interface ListPokemon {
  name: string;
  url: string;
}

// Result of Pokemon list API
export interface ListResponse<T = unknown> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
