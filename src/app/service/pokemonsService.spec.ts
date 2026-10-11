import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { PokeService } from './pokemonService';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

describe('Test in pokemon service', () => {
  function setup() {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    return {
      httpMock: TestBed.inject(HttpTestingController),
      pokemonService: TestBed.inject(PokeService),
    };
  }

  it('should return a pokemon by name', () => {
    const { httpMock, pokemonService } = setup();
    const pokemonResponse = { id: 132, name: 'ditto' };

    pokemonService.getPokemonByName('ditto').subscribe((pokemon) => {
      expect(pokemon).toEqual(pokemonResponse);
    });

    const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon/ditto');
    expect(req.request.method).toBe('GET');
    req.flush(pokemonResponse);
    httpMock.verify();
  });

  it('should return a pokemon by ID', () => {
    const { httpMock, pokemonService } = setup();
    const pokemonResponse = { id: 1, name: 'bulbasaur' };

    pokemonService.getPokemonById(1).subscribe((pokemon) => {
      expect(pokemon).toEqual(pokemonResponse);
    });

    const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon/1');
    expect(req.request.method).toBe('GET');
    req.flush(pokemonResponse);
    httpMock.verify();
  });

  it('should return an empty signal when havent call getPokemons', () => {
    const { pokemonService } = setup();

    expect(pokemonService.pokemons().length).toBe(0);
    expect(pokemonService.pokemons()).toEqual([]);
  });

  it('Should return an array of pokemons', () => {
    const { httpMock, pokemonService } = setup();

    const pokemonResponse = {
      count: 2,
      next: '',
      previous: null,
      results: [
        { name: 'ditto', url: 'https://pokeapi.co/api/v2/pokemon/132/' },
        { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' },
      ],
    };

    pokemonService.getPokemons();

    const req = httpMock.expectOne(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=0`);
    expect(req.request.method).toBe('GET');
    req.flush(pokemonResponse);
    expect(pokemonService.pokemons()).toEqual(['ditto', 'pikachu']);
    expect(pokemonService.pokemons().length).toBe(2);
    httpMock.verify();
  });

  it('should return an empty array when failed', () => {

    const { httpMock, pokemonService  } = setup();
    pokemonService.getPokemons();

    const req = httpMock.expectOne(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=0`)
    expect(req.request.method).toBe('GET')
    req.flush([])
    
    expect(pokemonService.pokemons().length).toBe(0)
   })

});
