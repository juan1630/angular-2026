import { Component, signal, OnInit, inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { concatMap, filter, from, fromEvent, map, mergeMap } from 'rxjs';
import { PokeService } from '../service/pokemonService';
import { PokemonCardI } from '../interfaces/pokeInterface';
import { PokemonCard } from './cards/cardPokemon';

@Component({
  selector: 'app-pokemon-list',
  imports: [PokemonCard],
  template: `
    <div class="h-full" id="scroll">
      <div class="grid grid-cols-4">
        @for (pokemon of pokemonsList(); track pokemon.pokemonId) {
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
  pokeService = inject(PokeService);
  pokemonsList = signal<PokemonCardI[]>([]);
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
        concatMap((pokemonId) => this.pokeService.getPokemonById(pokemonId)),
        map(
          (pokemon) => ({
            name: pokemon.name,
            pokemonImage: pokemon?.sprites?.other?.dream_world.front_default ?? '',
            abilities: pokemon.abilities,
            pokemonId: pokemon.id,
          }),
        )
      )
      .subscribe((data) => {
        this.pokemonsList.update((prev) => [...prev, data]);
      });
  }
}
