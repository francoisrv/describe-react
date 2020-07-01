import run from "./run"
import Describe from "./components/Describe"
import React from "react"
import Render from "./components/Render"
import Expect from "./components/Expect"
import To from "./components/To"

describe('Examples', () => {
  run(() => (
    <Describe label="Test">
      <Render>
        <div />
      </Render>

      <Expect root element>
        <To have type="div" />
      </Expect>
    </Describe>
  ))
})
