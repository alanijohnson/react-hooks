// useState: greeting
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react'

function Greeting({initialName}) {
  // 💣 delete this variable declaration and replace it with a React.useState call
  console.log(initialName);
  const [username, setUsername] = React.useState(initialName);

  function handleChange(event) {
    // 🐨 update the name here based on event.target.value
    setUsername(event.target.elements.name.value);
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input onChange={handleChange} id="name" />
      </form>
      {username ? <strong>Hello {username}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting initialName="tim"/>
}

export default App
