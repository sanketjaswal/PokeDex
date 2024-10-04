export interface PokemonSpeciesData {
  generation: { name: string };
  shape: { name: string };
  color: { name: string };
  egg_groups: { name: string }[];
  flavor_text_entries: { flavor_text: string; language: { name: string } }[];
}
