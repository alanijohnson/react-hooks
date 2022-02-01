// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
// 🐨 you'll want the following additional things from '../pokemon':
// fetchPokemon: the function we call to get the pokemon info
// PokemonInfoFallback: the thing we show while we're loading the pokemon info
// PokemonDataView: the stuff we use to display the pokemon info
import {fetchPokemon, PokemonDataView, PokemonForm, PokemonInfoFallback} from '../pokemon'
import {useEffect, useState} from "react";
import {ErrorBoundary} from 'react-error-boundary'

function ErrorFallback({error, resetErrorBoundary}) {
  return (<div role="alert">
    There was an error: <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try Again</button>
  </div>

  )
}

function PokemonInfo({pokemonName}) {
  const [infoState, setInfoState] = useState({
    pokemon: null,
    status: pokemonName === '' ? 'idle' : 'pending',
    error: null
  })

  useEffect(() => {
    if (!pokemonName){
      return
    }
    const effect = async () => {
      try {
        setInfoState({...infoState, status: "pending"})
        const response = await fetchPokemon(pokemonName);
        setInfoState({...infoState, pokemon: response, status: "resolved"})
      } catch (e) {
        setInfoState({...infoState, error: e, status: "rejected"})
      }
    }
    effect()
  }, [pokemonName]);

  switch (infoState.status) {
    case 'idle':
      return 'Submit a pokemon'

    case 'resolved':
      return <PokemonDataView pokemon={infoState.pokemon} />

    case 'rejected':
      throw infoState.error

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

  function handleReset() {
    setPokemonName('')
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <ErrorBoundary FallbackComponent={ErrorFallback} onReset={handleReset}>
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default App
