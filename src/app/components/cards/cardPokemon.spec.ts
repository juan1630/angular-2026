import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonCard } from './cardPokemon';
import { inputBinding } from '@angular/core';
import { pokemonList } from '../mocks/pokemons/pokemonsList';

describe('test in pokemon card', () => {
  let component: PokemonCard;
  let fixtureComponent: ComponentFixture<PokemonCard>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonCard],
    }).compileComponents();

    fixtureComponent = TestBed.createComponent(PokemonCard, {
      bindings: [inputBinding('pokemon', () =>  pokemonList[0])],
    });
    component = fixtureComponent.componentInstance;
    compiled = fixtureComponent.nativeElement as HTMLElement;
    fixtureComponent.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should show correct name in card', () => {
    let h5Tag = fixtureComponent.nativeElement.querySelector('h5');
    expect(h5Tag.textContent).toContain('bulbasaur');
  });

  it('should display correct id in card', () => {
    const button = fixtureComponent.nativeElement.querySelector('button');
    expect(button.textContent).toContain('1');
  });
  it('should add correct path to show image', () => {
    const img = fixtureComponent.nativeElement.querySelector('img');
    expect(img.src).toContain('');
  });
});
