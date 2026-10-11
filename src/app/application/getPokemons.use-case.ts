import { Observable } from 'rxjs'
import { Pokemon } from '../domain/pokemon.interface'
import { PokemonRepository } from './getPokemons.repository'


export class GetPokemonsList{
    constructor(
        private readonly repository: PokemonRepository
    ){}

    execute(id:number):Observable<Pokemon> {
        return this.repository.getPokemonById(id)
    }
}