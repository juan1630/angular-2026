import { TestBed } from '@angular/core/testing';
import { PokemonService } from './pokemons.service';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { PokemonapiResponse } from '../interfaces/pokeApiResponse';
import { SimeplPokemon } from '../interfaces/simplePokemon.interface';

const mockPokeApiResponse: PokemonapiResponse = {
  count: 1302,
  next: 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20',
  previous: null,
  results: [
    {
      name: 'bulbasaur',
      url: 'https://pokeapi.co/api/v2/pokemon/1/',
    },
    {
      name: 'ivysaur',
      url: 'https://pokeapi.co/api/v2/pokemon/2/',
    },
  ],
};

const expectedPokemons: SimeplPokemon[] = [
  { id: '1', name: 'bulbasaur' },
  { id: '2', name: 'ivysaur' },
];

const mockPokemon = {
  id: 1,
  name: 'bulbasaur',
} as any;

describe('pokemonService', () => {
  let service: PokemonService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClientTesting()],
    });
    service = TestBed.inject(PokemonService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load a page of pokemons', () => {
    service.loadPage(1).subscribe((pokemons) => {
      expect(pokemons).toEqual(expectedPokemons);
    });

    const req = httpMock.expectOne(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=0`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPokeApiResponse);
  });

  it('should load page 5 of pokemons', () => {
    service.loadPage(5).subscribe((pokemons) => {
      expect(pokemons).toEqual(expectedPokemons);
    });

    const req = httpMock.expectOne(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=80`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPokeApiResponse);
  });

  it('should load a pokemon by ID', () => {
    service.loadPokemon('1').subscribe((pokemons) => {
      expect(pokemons).toEqual(mockPokemon);
    });

    const req = httpMock.expectOne(`https://pokeapi.co/api/v2/pokemon/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPokemon);
  });

  it('should load a pokemon by Name', () => {
    service.loadPokemon(mockPokemon.name).subscribe((pokemons) => {
      expect(pokemons).toEqual(mockPokemon);
    });

    const req = httpMock.expectOne(`https://pokeapi.co/api/v2/pokemon/${mockPokemon.name}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPokemon);
  });

  it('should catch error if API fails', () => {
    service.loadPokemon(mockPokemon.name).subscribe({
      next: () => {
        throw new Error('Not found - Pokémon not found');
      },
      error: (error) => {
        expect(error.status).toBe(404);
        expect(error.statusText).toBe('Pokémon Not found');
      },
    });

    const req = httpMock.expectOne(`https://pokeapi.co/api/v2/pokemon/${mockPokemon.name}`);
    // expect(req.request.method).toBe('GET');
    req.flush('404 Error', {
      status: 404,
      statusText: 'Pokémon Not found',
    });
  });
});
