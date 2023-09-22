import { createContextId } from "@builder.io/qwik";

export interface IPokemonGameState {
    pokemonId:          number;
    showBackImage:      boolean;
    isVisible:   boolean;
}

export const PokemonGameContext = createContextId<IPokemonGameState>('pokemon.game-context');