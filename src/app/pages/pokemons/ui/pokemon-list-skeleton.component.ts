import { Component } from "@angular/core";
import { PokemonCardComponent } from "../../../pokemons/components/card/pokemon-card.component";

@Component({
    selector:'pokemon-list-skeleton',
    templateUrl: './pokemon-list-skeleton.component.html',
    imports: [PokemonCardComponent]
})
export class PokemonListSkeletonComponent {

} 