import { component$ } from '@builder.io/qwik';
import { useLocation, routeLoader$, RequestEventLoader } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';

export const usePokemonId = routeLoader$<number>(({ params, redirect }) => {
    const id = Number(params.id);
    if( isNaN(id) || id <= 0 || id > 1000 ) redirect(301, '/');
    return id;
});

export default component$(() => {

    const pokemonId = usePokemonId();

  return (
    <>
        <span class="text-5xl">Pokemon: { pokemonId.value }</span>
        <PokemonImage id={ pokemonId.value }/>
    </>
  )
});