import { Component, inject, OnInit, signal } from '@angular/core';
import { Pokedex } from '../../interfaces/pokeInterface';
import { PokemonService } from '../../pokemons/services/pokemons.service';
import { ActivatedRoute } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { tap } from 'rxjs';

@Component({
  selector: 'single-pokemon-view',
  templateUrl: './singlePokemon.component.html',
})
export default class SinglePokemonComponent implements OnInit {
  public singlePokemon = signal<Pokedex | null>(null);
  private pokemonService = inject(PokemonService);
  private route = inject(ActivatedRoute);
  private title = inject(Title)
  private meta = inject(Meta)

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') || '1';
    this.pokemonService.loadPokemon(id)
    .pipe( tap(({ name, id }) => {
        this.title.setTitle(`${name} - #${id}`)
        this.meta.updateTag({name: 'description', content: `Pagina del Pokémon ${name}`})
        this.meta.updateTag({name: 'og:title', content: `Pagina del Pokémon ${name}`})
        this.meta.updateTag({name: 'og:image', content: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`})
    }))
    .subscribe(this.singlePokemon.set);
  }
}
