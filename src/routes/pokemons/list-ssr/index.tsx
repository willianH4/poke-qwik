import { component$, useComputed$ } from '@builder.io/qwik';
import { Link, type DocumentHead, routeLoader$, useLocation } from '@builder.io/qwik-city';
import type { BasicInfo, IPokemonListResponse } from '~/data/interfaces/PokemonList';

// Petición del lado del servidor
export const usePokemonList = routeLoader$<BasicInfo[]>(async({ query, redirect, pathname }) => {

  const offset = Number( query.get('offset') || '0' );
  if( offset < 0 || isNaN(offset) ) redirect(301, pathname);

  const resp = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`);
  const data = await resp.json() as IPokemonListResponse;
  return data.results;

})

export default component$(() => {

  const pokemons = usePokemonList();
  const location = useLocation();
  
  // propiedad computada
  const currentOffset = useComputed$<number>(() => {
    const offSetString = location.url.searchParams.get('offset');
    return Number(offSetString || 0); // add aditional validations
  })

  location.params

  return(
    <>
      <div class="flex flex-col">
        <span class="my-5 text-5xl">Status</span>
        <span>Pagina actual: { currentOffset }</span>
        <span>Esta cargando pagina: { location.isNavigating ? 'Si' : 'No' }</span>
      </div>

      <div class="mt-10">
        <Link href={`/pokemons/list-ssr/?offset=${currentOffset.value - 10}`} class="btn btn-primary mr-2">
          Anteriores
        </Link>

        <Link href={`/pokemons/list-ssr/?offset=${currentOffset.value + 10}`} class="btn btn-primary mr-2">
          Siguientes
        </Link>
      </div>

      <div class="grid grid-cols-6 mt-5">
        {
          pokemons.value.map((pokemon) => (
            <div key={ pokemon.name } class="m-5 flex flex-col justify-center items-center">
              <span class="capitalize">{ pokemon.name }</span>
            </div>
          ))
        }
      </div>
    </>
  )
});

export const head: DocumentHead = {
  title: 'List SSR'
};