import React from 'react'
import run, { Describe, Render, Expect, Element, Property } from '.'

describe('README', () => {
  run(() => (
    <Describe label="Quick usage">
      <Render>
        <span id="foo">Hello</span>
      </Render>
      
      <Expect
        root element
        toHaveText="Hello"
        toHaveProperty={ <Property name="id" value="foo" /> }
        notToHaveProperty="className"
      />
    </Describe>
  ))
})
