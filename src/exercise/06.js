// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
// 🐨 you'll want the following additional things from '../pokemon':
// fetchPokemon: the function we call to get the pokemon info
// PokemonInfoFallback: the thing we show while we're loading the pokemon info
// PokemonDataView: the stuff we use to display the pokemon info
import {fetchPokemon, PokemonDataView, PokemonForm, PokemonInfoFallback} from '../pokemon'
import {useEffect, useState} from "react";

function PokemonInfo({pokemonName}) {
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle')

  useEffect(() => {
    if (!pokemonName){
      return
    }
    setPokemon(null);
    const effect = async () => {
      try {
        setStatus('pending')
        const response = await fetchPokemon(pokemonName);
        setPokemon(response)
        setStatus('resolved')
      } catch (e) {
        setError(e)
        setStatus('rejected')
      }
    }
    effect()
  }, [pokemonName]);

  switch (status) {
    case 'idle':
      return 'Submit a pokemon'

    case 'resolved':
      return <PokemonDataView pokemon={pokemon} />

    case 'rejected':
      return (<div role="alert">
        There was an error: <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
      </div>)

    case 'pending':
      return <PokemonInfoFallback name={pokemonName} />

    default:
      throw new Error('Not reached')

  }

}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  )
}

export default App
