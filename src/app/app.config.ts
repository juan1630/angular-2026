import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { POKEMON_REPOSITORY } from './application/ports/pokemonList.repository.token'
import { PokeService } from './infrastructure/getPokemons.repository'

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    {
      provide: POKEMON_REPOSITORY,
      useExisting: PokeService
    },
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes)
  ]
};
