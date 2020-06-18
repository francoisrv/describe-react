import run, { Describe, Render, Expect } from "."
import * as React from 'react'

function Specs() {
  return (
    <Describe label="List">
      <Render>
        <ul>
          <li>1</li>
          <li>2</li>
        </ul>
      </Render>
      <Expect elements="li" toHaveLength={2} />
      <Expect first element="li" toHaveText="1" />
    </Describe>
  )
}

run(Specs)