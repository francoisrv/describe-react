import run from "../run"
import Describe from "./Describe"
import React from "react"
import Run from "./Run"

describe('Run', () => {

  run(() => {
    let foo = true

    function syncFunction() {
      foo = false
    }

    function checkFunction() {
      expect(foo).toBe(false)
    }

    return (
      <Describe label="Run synchronous function">
        <Run
          function={ syncFunction }
        />
        <Run
          function={ checkFunction }
        />
      </Describe>
    )
  })

})