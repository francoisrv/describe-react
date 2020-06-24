import run from "./run"
import Describe from "./components/Describe"
import React from "react"
import Render from "./components/Render"
import Expect from "./components/Expect"
import { assertType } from "./entities/AssertType"
import One from "./components/One"

const Duda = () => <span />

function lambda() {}

describe('README', () => {
  run(() => (
    <Describe label="type">
      <Render>
        <div />
      </Render>

      <Expect
        root element
        toHaveType="div"
        notToHaveType="div"
        label="using string"
      />

      <Expect
        root element
        toHaveType={Duda}
        notToHaveType={Duda}
        label="using component"
      />

      <Expect
        root element
        toHaveType={ assertType(lambda) }
        notToHaveType={ assertType(lambda) }
        label="using assertions with named functions"
      />

      <Expect
        root element
        toHaveType={ assertType(function() {}) }
        notToHaveType={ assertType(function() {}) }
        label="using assertions with unnamed functions"
      />

      <Expect
        root element
        toHaveType={ assertType(lambda, 'is a valid type') }
        notToHaveType={ assertType(lambda, 'is a valid type') }
        label="using assertions with labels"
      />

      <Expect
        root element
        toHaveType={ <One<number> of={[  ]} /> }
        notToHaveType={ <One of={[ 'div', Duda, /foo/, assertType(lambda, 'is a valid type') ]} /> }
        label="using assertions with one of"
      />
    </Describe>
  ))
})
