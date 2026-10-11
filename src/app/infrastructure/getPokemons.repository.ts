import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { map, Observable } from 'rxjs';

import { PokedeDetails } from './pokemonApiResponse.dto';
import { PokemonRepository } from '../application/getPokemons.repository';
import { Pokemon } from '../domain/pokemon.interface';

@Injectable({
  providedIn: 'root',
})
export class PokeService implements PokemonRepository {
  private http = inject(HttpClient);
  pokemons = signal<string[]>([]);

  getPokemonById(id: number): Observable<Pokemon> {
    return this.http.get<PokedeDetails>(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .pipe(
        map( pokemon => this.toDomain(pokemon) )
    )
  }

  toDomain(pokemon: PokedeDetails): Pokemon {
    return {
      name: pokemon.name,
      pokemonImage: pokemon?.sprites?.other?.dream_world.front_default ?? '',
      abilities: pokemon.abilities,
      pokemonId: pokemon.id,
    };
  }
}
