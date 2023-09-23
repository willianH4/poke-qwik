import { $, component$, useComputed$, useSignal } from '@builder.io/qwik';
import { Link, type DocumentHead, routeLoader$, useLocation } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { Modal } from '~/components/shared';
import { ISmallPokemon } from '~/data/interfaces/SmallPokemon';
import { getSmallPokemons } from '~/helpers/getSmallPokemons';

// Petición del lado del servidor
export const usePokemonList = routeLoader$<ISmallPokemon[]>(async({ query, redirect, pathname }) => {

  const offset = Number( query.get('offset') || '0' );
  if( offset < 0 || isNaN(offset) ) redirect(301, pathname);

  const pokemons = await getSmallPokemons(offset);
  console.log(pokemons);
  return pokemons;

})

export default component$(() => {

  const pokemons = usePokemonList();
  const location = useLocation();
  const modalVisible = useSignal(false);

  //Modal functions
  const showModal = $(( id: string, name: string ) => {
    console.log({id, name});
    modalVisible.value = true;
  });

  const closeModal = $(() => {
    modalVisible.value = false;
  });
  
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
            <div key={ pokemon.name } onClick$={ () => showModal(pokemon.id!, pokemon.name) } class="m-5 flex flex-col justify-center items-center">
              <PokemonImage id={ pokemon.id }/>
              <span class="capitalize">{ pokemon.name }</span>
            </div>
          ))
        }
      </div>

      {/* Slots */}
      <Modal showModal={ modalVisible.value } closeFn={ closeModal }>
        <div q:slot='title'>Nombre del pokemon</div>
        <div q:slot='content' class="flex flex-col justify-center items-center">
          <PokemonImage id={1}/>
          <span>Preguntandole a ChatGPT</span>
        </div>
      </Modal>
    </>
  )
});

export const head: DocumentHead = {
  title: 'List SSR'
};