// Interface for the species object containing name and URL
interface Species {
  name: string;
  url: string;
}

// Interface for evolution details (optional, can contain evolution conditions like items or level)
// interface EvolutionDetails {
//   item?: any;
//   trigger?: any;
//   gender?: number;
//   held_item?: any;
//   known_move?: any;
//   known_move_type?: any;
//   location?: any;
//   min_affection?: number;
//   min_beauty?: number;
//   min_happiness?: number;
//   min_level?: number;
//   needs_overworld_rain?: boolean;
//   party_species?: any;
//   party_type?: any;
//   relative_physical_stats?: number;
//   time_of_day?: string;
//   trade_species?: any;
//   turn_upside_down?: boolean;
// }

// Interface for each link in the evolution chain
export interface EvolutionChainLink {
  species: Species;
  evolves_to: EvolutionChainLink[]; // Recursive structure to represent further evolutions
  //   is_baby: boolean;
  //   evolution_details: EvolutionDetails[];
}

// Root interface for the evolution chain
export interface EvolutionChain {
  id: number;
  chain: EvolutionChainLink; // The starting point of the evolution chain
}
