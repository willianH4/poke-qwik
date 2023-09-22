import { component$ } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { usePokemonGame } from '~/hooks';

export const usePokemonId = routeLoader$<number>(({ params, redirect }) => {
    const id = Number(params.id);
    if( isNaN(id) || id <= 0 || id > 1000 ) redirect(301, '/');
    return id;
});

export default component$(() => {

    const pokemonId = usePokemonId();
    const { toggleFromBack, toggleVisible, isVisible, showBackImage } = usePokemonGame();

  return (
    <>
        <span class="text-5xl">Pokemon: { pokemonId.value }</span>
        <PokemonImage 
        id={ pokemonId.value }
        isVisible={ isVisible.value }
        backImage={ showBackImage.value }
        />

    <div class="mt-2">
        <button onClick$={ toggleFromBack } class="btn btn-primary mr-2">Voltear</button>
        <button onClick$={ toggleVisible } class="btn btn-primary">Revelar</button>
     </div>
    </>
  )
});