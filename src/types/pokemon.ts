
export interface Pokemon {
  id: number;
  name: string;
  types: PokemonType[];
  sprites: {
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
  height: number;
  weight: number;
  abilities: {
    ability: {
      name: string;
    };
  }[];
}

export interface PokemonType {
  type: {
    name: string;
  };
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    name: string;
    url: string;
  }[];
}
