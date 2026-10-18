import { ApplicationRef, Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { PokemonListComponent } from '../../pokemons/components/pokemon-list.component';
import { PokemonListSkeletonComponent } from './ui/pokemon-list-skeleton.component';
import { PokemonService } from '../../pokemons/services/pokemons.service';
import { SimeplPokemon } from '../../pokemons/interfaces/simplePokemon.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, tap } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'pokemons-page',
  templateUrl: './pokemons.component.html',
  imports: [PokemonListComponent, PokemonListSkeletonComponent],
})
export default class PokemonsComponent implements OnInit, OnDestroy {
  public pokemonService = inject(PokemonService);
  public isLoading = signal(true);
  public pokemons = signal<SimeplPokemon[]>([]);
  private route = inject(ActivatedRoute);
  private router = inject(Router)
  private title = inject(Title)

  private currentPage = toSignal<number>(
    this.route.queryParamMap.pipe(
      map((params) => params.get('page') ?? '1'),
      map((page) => (isNaN(+page) ? 1 : +page)),
      map((page) => Math.max(1, page))
    ),
  );
  // private appRef = inject(ApplicationRef)

  // private $appState = this.appRef.isStable.subscribe((isStable) => {
  //     console.log({isStable})
  // })

  ngOnInit(): void {
    // setTimeout( () => {
    //     this.isLoading.set(false)
    // }, 5000)
    // console.log(this.currentPage());
    this.loadPokemons();
  }

  ngOnDestroy(): void {
    // this.$appState.unsubscribe();
  }

  public loadPokemons(page: number = 0) {
    const pageToLoad = this.currentPage()! + page
    this.pokemonService.loadPage(pageToLoad)
    .pipe(tap(() => {
        this.router.navigate([], { queryParams: { page: pageToLoad } })
    }),
    tap(() => this.title.setTitle(`pokemons SSR- PAGE ${pageToLoad}`))
    )
    .subscribe((pokemons) => {
      this.pokemons.set(pokemons);
    });
  }
}
