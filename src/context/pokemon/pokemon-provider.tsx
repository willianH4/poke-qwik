import { Slot, component$, useContextProvider, useStore } from "@builder.io/qwik";
import { type IPokemonGameState, PokemonGameContext } from "./pokemon-game.conext";
import { type IPokemonListState, PokemonListContext } from "./pokemon-list.context";

export const PokemonProvider = component$(() => {
  
    const pokemonGame = useStore<IPokemonGameState>({
        pokemonId: 4,
        isVisible: true,
        showBackImage: false,
      });
    
      const pokemonList = useStore<IPokemonListState>({
        currentPage: 1,
        isLoading: false,
        pokemons: [],
      });
    
      useContextProvider( PokemonGameContext, pokemonGame );
      useContextProvider( PokemonListContext, pokemonList );

    return <Slot/>
});