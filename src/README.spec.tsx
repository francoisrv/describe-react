import run from "./run"
import Describe from "./components/Describe"
import React from "react"
import Render from "./components/Render"
import Expect from "./components/Expect"
import { assert } from "./entities/Assert"
import One from "./components/One"
import { Of, UnitTypeIdentifier, UnitTextIdentifier } from "./types"
import Property from "./components/Property"

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
        toHaveType={ assert(lambda) }
        notToHaveType={ assert(lambda) }
        label="using assertions with named functions"
      />

      <Expect
        root element
        toHaveType={ assert(function() {}) }
        notToHaveType={ assert(function() {}) }
        label="using assertions with unnamed functions"
      />

      <Expect
        root element
        toHaveType={ assert(lambda, 'is a valid type') }
        notToHaveType={ assert(lambda, 'is a valid type') }
        label="using assertions with labels"
      />

      <Expect
        root element
        toHaveType={ <One<Of<UnitTypeIdentifier>> of={[ 'div', Duda, assert(lambda, 'is a valid type') ]} /> }
        notToHaveType={ <One<Of<UnitTypeIdentifier>> of={[ 'div', Duda, assert(lambda, 'is a valid type') ]} /> }
        label="using assertions with one of"
      />
    </Describe>
  ))

  run(() => (
    <Describe label="text">
      <Render>
        <div />
      </Render>

      <Expect
        first element
        toHaveText="foo"
        notToHaveText="foo"
        label="string"
      />

      <Expect
        first element
        toHaveText={/foo/}
        notToHaveText={/foo/}
        label="regular expression"
      />

      <Expect
        first element
        toHaveText={assert(lambda, 'is a nice text')}
        notToHaveText={assert(lambda, 'is a nice text')}
        label="assertions"
      />

<Expect
        first element
        toHaveText={<One<Of<UnitTextIdentifier>> of={['foo', /bar/, assert(lambda, 'is a nice text')]} />}
        notToHaveText={<One<Of<UnitTextIdentifier>> of={['foo', /bar/, assert(lambda, 'is a nice text')]} />}
        label="one of"
      />
    </Describe>
  ))

  run(() => (
    <Describe label="property">
      <Render>
        <div />
      </Render>

      <Expect
        first element
        toHaveProperty="div"
        notToHaveProperty="div"
        label="string"
      />

      <Expect
        first element
        toHaveProperty={ /div/ }
        notToHaveProperty={ /div/ }
        label="regex"
      />

      <Expect
        first element
        toHaveProperty={ <Property name="foo" /> }
        notToHaveProperty={ <Property name="foo" /> }
        label="Property with string names"
      />

      <Expect
        first element
        toHaveProperty={ <Property name={ /foo/ } /> }
        notToHaveProperty={ <Property name={ /foo/ } /> }
        label="Property with regex names"
      />

      <Expect
        first element
        toHaveProperty={ <Property name={ /foo/ } value="keys" /> }
        notToHaveProperty={ <Property name={ /foo/ } value="keys" /> }
        label="Property with name and value"
      />
    </Describe>
  ))
})
