import type { ISmallPokemon } from "./SmallPokemon";

export interface IPokemonPageState {
    currentPage:    number;
    isLoading:      boolean;
    pokemons:       ISmallPokemon[];
}