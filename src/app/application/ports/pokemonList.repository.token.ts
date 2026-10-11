import { InjectionToken } from '@angular/core';
import { PokemonRepository } from '../getPokemons.repository';

export const POKEMON_REPOSITORY =
  new InjectionToken<PokemonRepository>(
    'POKEMON_REPOSITORY'
  );