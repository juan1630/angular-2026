import { Component, computed, effect, input } from '@angular/core';
import { SimeplPokemon } from '../../interfaces/simplePokemon.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'pokemon-card-view',
  templateUrl: './pokemon-card.component.html',
  imports: [RouterLink],
})
export class PokemonCardComponent {
  
  public pokemon = input.required<SimeplPokemon>();
  public readonly pokemonImage = computed(
    () => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${this.pokemon().id}.png`
  })
  // logEffect = effect(() => {
  //   console.log('Pokemon card', this.pokemonImage())
  // })
}
