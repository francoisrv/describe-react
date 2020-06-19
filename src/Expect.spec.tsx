import run, { Describe, Render, Expect } from "."
import * as React from 'react'

run(() => (
  <Describe label="List">
    <Render>
      <ul>
        <li>1</li>
        <li>2</li>
      </ul>
    </Render>
    <Expect element="ul" toHaveType="ul" />
  </Describe>
))
