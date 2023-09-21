import { component$, Slot, useContextProvider, useStore, useStyles$ } from '@builder.io/qwik';
import Navbar from '~/components/shared/navbar/navbar';

import styles from './styles.css?inline';
import { IPokemonGameState, IPokemonListState, PokemonGameContext, PokemonListContext } from '~/context';

export default component$(() => {
  useStyles$(styles);

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

  return (
    <>
      <Navbar />
      <main class="flex flex-col items-center justify-center">
        <Slot />
      </main>
    </>
  );
});
