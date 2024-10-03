import { ListPokemon } from './pokemon';
import { PokemonType } from './pokemonDetails';

export interface ListType {
  name: PokemonType;
  url: string;
}

interface DamageRelation {
  name: string;
  url: string;
}

interface GameIndex {
  game_index: number;
  generation: {
    name: string;
    url: string;
  };
}

interface Move {
  name: string;
  url: string;
}

interface Language {
  language: {
    name: string;
    url: string;
  };
  name: string;
}

export interface TypePokemonsResponse {
  pokemon: ListPokemon;
  slot: number;
}

export interface TypeResponse {
  damage_relations: {
    double_damage_from: DamageRelation[];
    double_damage_to: DamageRelation[];
    half_damage_from: DamageRelation[];
    half_damage_to: DamageRelation[];
    no_damage_from: DamageRelation[];
    no_damage_to: DamageRelation[];
  };
  game_indices: GameIndex[];
  generation: {
    name: string;
    url: string;
  };
  id: number;
  move_damage_class: {
    name: string;
    url: string;
  };
  moves: Move[];
  name: string;
  names: Language[];
  past_damage_relations: any[]; // Since this is an empty array, you may want to change it to a proper type if needed.
  pokemon: TypePokemonsResponse[];
}
