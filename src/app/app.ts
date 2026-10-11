import { Component, signal } from '@angular/core';
import { PokemonList } from './components/pokemonList';

@Component({
  imports: [ PokemonList],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('middle-angular');
}
