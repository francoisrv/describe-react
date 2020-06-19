import run, { Describe, Render, Expect, Click } from "."
import * as React from 'react'

function App() {
  const [value, setValue] = React.useState(false)
  const onClick = () => {
    setValue(!value)
  }
  return (
    <div>
      <span>
        { value ? 'yes' : 'no' }
      </span>
      <button onClick={ onClick }>
        Toggle
      </button>
    </div>
  )
}

function Hooks() {
  return (
    <Describe label="Hooks">
      <Render>
        <App />
      </Render>
      <Expect element="span" toHaveText="no" />
      <Click element="button" />
      <Expect element="span" toHaveText="yes" />
    </Describe>
  )
}

run(Hooks)
