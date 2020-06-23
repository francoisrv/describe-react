import React from 'react'
import run, { Describe, Render, Expect, Element } from '.'

describe('README', () => {
  run(() => (
    <Describe label="Quick usage">
      <Render>
        <span id="foo">Hello</span>
      </Render>
      <Expect
        root element
        toHaveText="Hello"
        toHaveProperty="id"
      />
    </Describe>
  ))

})
