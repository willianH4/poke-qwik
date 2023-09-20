import { component$ } from "@builder.io/qwik";

interface Props {
    id?:        number;
    size?:      number;
    backImage:  boolean;
}

export const PokemonImage = component$(( {id, size = 300, backImage = false}:Props ) => {
    console.log({back: backImage})
    return(
        <>
            <img src={ backImage ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${id}.png` : 
            `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png` } 
            alt="Pokemon" style={{ width:`${size}` }}/>
        </>
    )
})