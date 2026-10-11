import { Observable } from 'rxjs'
import { Pokemon } from '../domain/pokemon.interface';


export interface PokemonRepository {
    getPokemonById(id:number):Observable<Pokemon>
}