import run from "../run"
import Describe from "./Describe"
import React from "react"
import Render from "./Render"
import Expect from "./Expect"
import To from "./To"
import Trigger from "./Trigger"

describe('Trigger', () => {
  function Counter() {
    const [counter, setCounter] = React.useState(0)
    function increment() {
      setCounter(counter + 1)
    }
    return (
      <button onClick={ increment }>
        { counter }
      </button>
    )
  }

  run(() => {
    return (
      <Describe label="should trigger event">
      <Render>
        <Counter />
      </Render>
      
      <Expect element="button">
        <To have text="0" />
      </Expect>

      <Trigger event="click" to element="button" />

      <Expect element="button">
        <To have text="1" />
      </Expect>
      </Describe>
    )
  })
})