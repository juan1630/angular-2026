import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { SimeplPokemon } from '../interfaces/simplePokemon.interface';
import { PokemonapiResponse } from '../interfaces/pokeApiResponse';
import { Pokedex } from '../../interfaces/pokeInterface';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private http = inject(HttpClient);

  public loadPage(page: number): Observable<SimeplPokemon[]> {
    if (page !== 0) {
      --page;
    }
    page = Math.max(0, page);

    return this.http
      .get<PokemonapiResponse>(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${page * 20}`)
      .pipe(
        map((response) => {
          const simplePokemon = response.results.map((pokemon) => ({
            id: pokemon.url.split('/').at(-2) ?? '',
            name: pokemon.name,
          }));
          return simplePokemon;
        }),
        // tap((pokemons) => console.log(pokemons))
      );
  }

  public loadPokemon(id: string):Observable<Pokedex> {
    return this.http.get<Pokedex>(`https://pokeapi.co/api/v2/pokemon/${id}`)
  }
}
