import { $, component$, useContext } from '@builder.io/qwik';
import { type DocumentHead } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { useNavigate } from '@builder.io/qwik-city';
import { PokemonGameContext } from '~/context';

export default component$(() => {

  const nav = useNavigate();

 const pokemonGame = useContext(PokemonGameContext);

  // function serialized for lazy load
  const changePokemonById = $(( value: number ) => {
    if( pokemonGame.pokemonId + value <= 0) return; 
    pokemonGame.pokemonId += value;
  });

  const goToPokemon = $((id: number) => {
    nav(`/pokemon/${id}/`)
  });

  return (
    <>
     <span class="text-2xl">Buscador simple</span>
     <span class="text-9xl">{ pokemonGame.pokemonId }</span>
     
     <div onClick$={ () => goToPokemon( pokemonGame.pokemonId ) }>
     <PokemonImage id={ pokemonGame.pokemonId } size={200} backImage={ pokemonGame.showBackImage } isVisible={ pokemonGame.isVisible }/>
     </div>

     <div class="mt-2">
        <button onClick$={ () => changePokemonById(-1) } class="btn btn-primary mr-2">Anterior</button>
        <button onClick$={ () => changePokemonById(+1) } class="btn btn-primary mr-2">Siguiente</button>
        <button onClick$={ () => pokemonGame.showBackImage = !pokemonGame.showBackImage } class="btn btn-primary mr-2">Voltear</button>
        <button onClick$={ () => pokemonGame.isVisible = !pokemonGame.isVisible } class="btn btn-primary">Revelar</button>
     </div>
    </>
  );
});

export const head: DocumentHead = {
  title: 'PokeQwik',
  meta: [
    {
      name: 'description',
      content: 'Primera aplicacion en qwik',
    },
  ],
};
