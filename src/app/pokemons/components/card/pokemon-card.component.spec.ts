import { TestBed, ComponentFixture } from '@angular/core/testing';
import { PokemonCardComponent } from './pokemon-card.component';
import { provideRouter, RouterLink } from '@angular/router';
import { routes } from '../../../app.routes';
import { By } from '@angular/platform-browser';

const mockPokemon = {
  id: '1',
  name: 'bulbasaur',
};

describe('PokemonCardComponet', () => {
  let component: PokemonCardComponent;
  let fixture: ComponentFixture<PokemonCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PokemonCardComponent],
      providers: [provideRouter(routes)],
    });

    fixture = TestBed.createComponent(PokemonCardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('pokemon', { ...mockPokemon });
    fixture.detectChanges();
  });

  it('should create PokemonCardComponet', () => {
    expect(component).toBeTruthy();
  });

  it('signal should have same data', () => {
    expect(component.pokemon()).toStrictEqual(mockPokemon);
  });

  it('should compute the correct pokemon image URL', () => {
    expect(component.pokemonImage()).toBe(
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${mockPokemon.id}.png`,
    );
  });

  it('should render pokemon image and name correctly', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const nameElement = compiled.querySelector('h2');
    const imageElement = compiled.querySelector('img');

    expect(nameElement?.textContent.trim()).toBe(mockPokemon.name);
    expect(imageElement?.src).toBe(
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${mockPokemon.id}.png`,
    );
    expect(imageElement?.alt).toBe(mockPokemon.name);
  });

  it('should have the correct routerLink configuration', () => {
    const debugElement = fixture.debugElement.query(By.directive(RouterLink));
    const routerLinkInstance = debugElement.injector.get(RouterLink);

    const expectedUrl = "/single-pokemon/bulbasaur";
    // console.log(routerLinkInstance.urlTree?.toString())

    expect(routerLinkInstance.urlTree?.toString()).toBe(expectedUrl)
  });
});
