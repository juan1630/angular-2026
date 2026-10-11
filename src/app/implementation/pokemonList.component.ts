import { Component, signal, OnInit, inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { filter, from, fromEvent, map, mergeMap, tap } from 'rxjs';
import { PokemonListFacade } from './pokemonList.facade';
import { PokemonCard } from '../components/cards/cardPokemon';

@Component({
  selector: 'app-pokemon-list-clean',
  imports: [PokemonCard],
  template: `
    <div class="h-full" id="scroll">
      <h5 class="text-lg" > Pokemons with clean architecture</h5>
      <div class="grid grid-cols-4">
        @for (pokemon of pokeService.pokemons(); track pokemon.pokemonId) {
          <app-pokemon-card [pokemon]="pokemon" />
        }
      </div>
      <button
        (click)="nextPokemons()"
        type="button"
        class="rounded-md bg-slate-800 py-2 px-4 mt-6 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
      >
        Next
      </button>
    </div>
  `,
})
export class PokemonList implements OnInit {
  offset = signal<number[]>([1, 2, 3, 4, 5, 6, 7]);
  pokeService = inject(PokemonListFacade);
  // pokemonsList = signal<PokemonCardI[]>([]);
  pokemonsIds$ = toObservable(this.offset);

  nextPokemons() {
    const newPokemons = this.offset().map((id) => id + 7);
    this.offset.set(newPokemons);
  }

  ngOnInit(): void {
    fromEvent(window, 'scroll')
      .pipe(
        map(
          () => window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 200,
        ),
        filter(Boolean),
      )
      .subscribe(() => this.nextPokemons());
    this.pokemonsIds$
      .pipe(
        mergeMap((id) => from(id)),
        tap((id) => this.pokeService.load(id)),
      )
      .subscribe();
  }
}
