import { Slot, component$, useContextProvider, useStore, useVisibleTask$ } from "@builder.io/qwik";
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

      // solo se ejecuta del lado del cliente
      useVisibleTask$(() => {
        if( localStorage.getItem('pokemon-game') ) {
          const { isVisible = true, pokemonId = 10, showBackImage = false } = JSON.parse(localStorage.getItem('pokemon-game')!) as IPokemonGameState;
        
          pokemonGame.isVisible = isVisible;
          pokemonGame.pokemonId = pokemonId;
          pokemonGame.showBackImage = showBackImage;
        }
      })

      useVisibleTask$(({ track }) => {
        track( () => [ pokemonGame.isVisible, pokemonGame.pokemonId, pokemonGame.showBackImage ]);

        localStorage.setItem('pokemon-game', JSON.stringify( pokemonGame ));
      })

    return <Slot/>
});