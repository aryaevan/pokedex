export interface Pokemon {
    name: string;
    url: string;
  }

export interface Ability {
    name: string;
    url: string;
}

export interface Sprites {
    front_default: string | null;
    back_default: string | null;
    front_shiny: string | null;
    back_shiny: string | null;
    back_female: string | null;
    back_shiny_female: string | null;
    front_female: string | null;
    front_shiny_female: string | null;
}

export interface AbilityInfo {
    ability: Ability;
    is_hidden: boolean;
    slot: number;
}

export interface PokemonData {
    id: string;
    name: string;
    sprites: Sprites;
    abilities: AbilityInfo[];
}