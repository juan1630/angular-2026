import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { filter, map, catchError, of, Observable } from 'rxjs';
import { PokedeDetails, Pokedex } from '../interfaces/pokeInterface';

interface Response {
  count: number;
  next: string;
  previous: null | string;
  results: Pokemon[];
}
interface Pokemon {
  name: string;
  url: string;
}

@Injectable({
  providedIn: 'root',
})
export class PokeService {
  private http = inject(HttpClient);
  pokemons = signal<string[]>([]);
  
  constructor(){}
  
  getPokemons(offset = 0) {
    const URL = `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`;
    return this.http
      .get<Response>(URL)
      .pipe(
        filter((pokemons) => pokemons !== null),
        map((pokemons) => {
          return pokemons.results.map((pokemon) => pokemon.name);
        }),
        catchError((error) => {
          console.log(error);
          return of([]);
        }),
      )
      .subscribe({
        next: (pokemons) =>
          this.pokemons.update((prev) => [...prev, ...pokemons]),
      }
    );
  }

  getPokemonByName(name: string):Observable<Pokedex>{
    return this.http.get<Pokedex>(`https://pokeapi.co/api/v2/pokemon/${name}`)
  }

  getPokemonById(id:number):Observable<PokedeDetails>{
    return this.http.get<PokedeDetails>(`https://pokeapi.co/api/v2/pokemon/${id}`)
  }

  getPokemonList(){}
}
