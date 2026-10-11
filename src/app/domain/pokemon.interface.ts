export interface Pokemon {
    name:string;
    pokemonId: number;
    abilities: Ability[]
    pokemonImage: string
}

export interface Ability {
    is_hidden: boolean;
    slot:      number;
    ability:   Species | null;
    name?: string
}


export interface Species {
    name: string;
    url:  string;
}