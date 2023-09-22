import { createContextId } from "@builder.io/qwik";
import type { ISmallPokemon } from "~/data/interfaces/SmallPokemon";

export interface IPokemonListState {
    currentPage:        number;
    isLoading:          boolean;
    pokemons:           ISmallPokemon[]
}

export const PokemonListContext = createContextId<IPokemonListState>('pokemon.list-context');
