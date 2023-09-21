import { component$, useStore, useTask$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import type { IPokemonPageState } from '~/data/interfaces/PokemonPageState';
import { getSmallPokemons } from '~/helpers/getSmallPokemons';

export default component$(() => {

  const pokemonsState = useStore<IPokemonPageState>({
    currentPage: 0,
    pokemons: []
  });

  // visible in client and server
  useTask$( async({ track }) =>  {
      track(() => pokemonsState.currentPage);
      const pokemons = await getSmallPokemons( pokemonsState.currentPage * 10 );
      pokemonsState.pokemons = [ ...pokemonsState.pokemons, ...pokemons ];
  });

  return(
    <>
      <div class="flex flex-col">
        <span class="my-5 text-5xl">Status</span>
        <span>Pagina actual: { pokemonsState.currentPage }</span>
        <span>Esta cargando: Si</span>
      </div>

      <div class="mt-10">
        <button class="btn btn-primary mr-2" onClick$={ () => pokemonsState.currentPage-- }>
          Anteriores
        </button>

        <button class="btn btn-primary mr-2" onClick$={ () => pokemonsState.currentPage++ }>
          Siguientes
        </button>
      </div>

      <div class="grid grid-cols-6 mt-5">
        {
          pokemonsState.pokemons.map((pokemon) => (
            <div key={ pokemon.name } class="m-5 flex flex-col justify-center items-center">
              <PokemonImage id={ pokemon.id }/>
              <span class="capitalize">{ pokemon.name }</span>
            </div>
          ))
        }
      </div>
    </>
  )
});

export const head: DocumentHead = {
  title: 'List Client'
};