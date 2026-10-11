import { Injectable, inject, signal } from '@angular/core';

import { Pokemon } from '../domain/pokemon.interface';
import { GetPokemonsList } from '../application/getPokemons.use-case';
import { POKEMON_REPOSITORY } from '../application/ports/pokemonList.repository.token';

@Injectable({ providedIn: 'root' })
export class PokemonListFacade {
  private readonly repository = inject(POKEMON_REPOSITORY);
  private readonly getPokemonList = new GetPokemonsList(this.repository);

  private readonly _pokemons = signal<Pokemon[]>([]);
  private readonly _loading = signal(false);
  private readonly _error = signal<string | null>(null);

  readonly pokemons = this._pokemons.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();


  load(id:number){
    this._loading.set(true);
    this._error.set(null);

    this.getPokemonList.execute(id).subscribe({
        next:(pokemons) => {
            this._pokemons.update(prev => [...prev, pokemons])
            this._loading.set(false)
        },
        error: ()=> {
            this._error.set('No fue posible cargar los pokemons')
            this._loading.set(false)
        }
    })
  }
}
