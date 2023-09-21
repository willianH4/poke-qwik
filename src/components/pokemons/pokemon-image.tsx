import { useSignal, component$, useTask$ } from "@builder.io/qwik";

interface Props {
    id?:        number;
    size?:      number;
    backImage:  boolean;
    isVisible?: boolean;
}

export const PokemonImage = component$(( {id, size = 300, backImage = false, isVisible = true}:Props ) => {
    
    const imageLoaded = useSignal(false);

    // hook
    useTask$(({ track }) => {
        track(() => id );

        imageLoaded.value = false;
    })
    
    return(
        <div class="flex items-center justify-center" style={{ width: `${size}px`, height: `${ size }px` }}>
            { !imageLoaded.value && <span>Cargando...</span> }
            <img src={ backImage ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${id}.png` : 
            `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png` } 
            alt="Pokemon" style={{ width:`${size}` }} onLoad$={ () => imageLoaded.value = true }
            class={[
                { 'hidden' : !imageLoaded.value,
                    'brightness-0': isVisible
                }, 'transition-all'
                ]}/>
        </div>
    )
})