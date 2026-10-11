import { Component, input } from '@angular/core';
import { PokemonCardI } from '../../interfaces/pokeInterface';

@Component({
  selector: 'app-pokemon-card',
  template: `<div
    class="flex-col mx-2 my-4 bg-white shadow-sm border border-slate-200 rounded-lg w-96"
  >
    <div class="p-4">
      <h5 class="mb-2 text-slate-800 text-xl font-semibold">
        {{ pokemon().name}}
      </h5>

      <div class="relative h-56 m-2.5 overflow-hidden text-white rounded-md">
        <img
          class="w-50 h-50 mx-auto"
          [src]="pokemon().pokemonImage"
          [alt]="pokemon().name"
        />
      </div>
      @for (ability of pokemon().abilities; track ability?.ability?.url) {
        <p class="text-slate-600 leading-normal font-light">
          {{ ability.ability?.name }}
        </p>
      }

      <button
        class="rounded-md bg-slate-800 py-2 px-4 mt-6 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        type="button"
      >
        {{ pokemon().pokemonId }}
      </button>
    </div>
  </div>`,
})
export class PokemonCard {
  pokemon = input.required<PokemonCardI>();
}
