import type { ISmallPokemon } from "./SmallPokemon";

export interface IPokemonPageState {
    currentPage:    number;
    pokemons:       ISmallPokemon[];
}