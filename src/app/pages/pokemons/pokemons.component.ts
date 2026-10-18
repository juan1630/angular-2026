import { Component, inject, signal, effect } from '@angular/core';
import { PokemonListComponent } from '../../pokemons/components/pokemon-list.component';
import { PokemonListSkeletonComponent } from './ui/pokemon-list-skeleton.component';
import { PokemonService } from '../../pokemons/services/pokemons.service';
import { SimeplPokemon } from '../../pokemons/interfaces/simplePokemon.interface';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, tap } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'pokemons-page',
  templateUrl: './pokemons.component.html',
  imports: [PokemonListComponent, PokemonListSkeletonComponent, RouterLink],
})
export default class PokemonsComponent {
  public pokemonService = inject(PokemonService);
  public isLoading = signal(true);
  public pokemons = signal<SimeplPokemon[]>([]);
  private route = inject(ActivatedRoute);
  private title = inject(Title);

  private currentPage = toSignal<number>(
    this.route.params.pipe(
      map((params) => params['page'] ?? '1'),
      map((page) => (isNaN(+page) ? 1 : +page)),
      map((page) => Math.max(1, page)),
    ),
  );

  public loadOnPageChange = effect(
    () => {
      console.log('cambio de página', this.currentPage());
      this.loadPokemons(this.currentPage());
    },
    {
      allowSignalWrites: true,
    },
  );

  public loadPokemons(page: number = 0) {
    this.pokemonService
      .loadPage(page)
      .pipe(tap(() => this.title.setTitle(`pokemons SSR- PAGE ${page}`)))
      .subscribe((pokemons) => {
        this.pokemons.set(pokemons);
      });
  }
}
