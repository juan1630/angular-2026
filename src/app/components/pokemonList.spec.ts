import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokeService } from '../service/pokemonService'
import { PokemonList } from './pokemonList';
import { PokemonCard } from './cards/cardPokemon';
import { pokemonList } from './mocks/pokemons/pokemonsList';

class MockPokemonService {
  getPokemonById = vi.fn()
}

describe('pokemon list', () => {
  let component: PokemonList;
  let fixtureComponent: ComponentFixture<PokemonList>;
  let compiled: HTMLElement;
  let MockPokemonService: MockPokemonService;

  beforeEach(async () => {
    MockPokemonService = new MockPokemonService();
    await TestBed.configureTestingModule({
      imports: [PokemonCard, PokemonList],
      providers: [{
        provide: PokeService,
        useValue: MockPokemonService
      }]
    }).compileComponents();

    fixtureComponent = TestBed.createComponent(PokemonList);
    component = fixtureComponent.componentInstance;
    compiled = fixtureComponent.nativeElement as HTMLElement;
    await fixtureComponent.whenStable();
  });

  it('should render component correctly', () => {
    expect(component).toBeTruthy();
  });

  it('should render first pokemon', () => {
    component.pokemonsList.set(pokemonList);

    let h5Tag = fixtureComponent.nativeElement.querySelector('h5');
    expect(h5Tag.textContent).toContain('bulbasaur');
  });
});
