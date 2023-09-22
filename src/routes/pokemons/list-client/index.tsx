import { $, component$, useContext, useOnDocument, useTask$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { PokemonListContext } from '~/context';
import { getSmallPokemons } from '~/helpers/getSmallPokemons';

export default component$(() => {

  const pokemonsState = useContext(PokemonListContext);

  // visible in client and server
  useTask$( async({ track }) =>  {
      track(() => pokemonsState.currentPage);
      const pokemons = await getSmallPokemons( pokemonsState.currentPage * 10, 30 );
      pokemonsState.pokemons = [ ...pokemonsState.pokemons, ...pokemons ];
      pokemonsState.isLoading = false;
  });

  useOnDocument('scroll', $((event) => {
    const maxScroll = document.body.scrollHeight;
    const currentScroll = window.scrollY + window.innerHeight;

    if ( (currentScroll + 200) >= maxScroll && !pokemonsState.isLoading ) {
      pokemonsState.isLoading = true;
      pokemonsState.currentPage++
    }
  }))

  return(
    <>
      <div class="flex flex-col">
        <span class="my-5 text-5xl">Status</span>
        <span>Pagina actual: { pokemonsState.currentPage }</span>
        <span>Esta cargando: Si</span>
      </div>

      <div class="mt-10">
        <button class="btn btn-primary mr-2" onClick$={ () => pokemonsState.currentPage++ }>
          Siguientes
        </button>
      </div>

      <div class="grid sm:grid-cols-2 md:grid-cols-5 xl:grid-cols-7 mt-5">
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