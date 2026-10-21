import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonListComponent } from './pokemon-list.component';
import { provideRouter } from '@angular/router';
import { routes } from '../../app.routes';

const mockPokemons = [
  {
    id: '1',
    name: 'bulbasaur',
  },
  {
    id: '2',
    name: 'ivysaur',
  },
  {
    id: '3',
    name: 'venusaur',
  },
];
describe('PokemonListComponent', () => {
  let component: PokemonListComponent;
  let fixture: ComponentFixture<PokemonListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PokemonListComponent],
      providers: [provideRouter(routes)],
    });

    fixture = TestBed.createComponent(PokemonListComponent);
    fixture.componentRef.setInput('pokemons', mockPokemons);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the pokemonlist', () => {
    expect(component.pokemons().length).toBe(mockPokemons.length);
    const compiled = fixture.nativeElement as HTMLElement;
    const pokemonsCard = compiled.querySelectorAll('pokemon-card-view');
    expect(pokemonsCard.length).toBe(mockPokemons.length);
  });

  it('should render empty satte when pokemons are empty', () => {
    fixture.componentRef.setInput('pokemons', []);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const pokemonsCard = compiled.querySelector('div.col-span-5');
    expect(pokemonsCard?.textContent.trim()).toBe('No hay pokemons')
  });
});
