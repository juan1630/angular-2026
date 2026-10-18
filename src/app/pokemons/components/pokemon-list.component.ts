import { Component, input } from "@angular/core";
import  { PokemonCardComponent } from './card/pokemon-card.component'
import { SimeplPokemon } from "../interfaces/simplePokemon.interface";

@Component({
    selector: 'pokemon-list-view',
    templateUrl: './pokemon-list.component.html',
    imports: [PokemonCardComponent]
})
export class PokemonListComponent {
    public pokemons = input.required<SimeplPokemon[]>()
}