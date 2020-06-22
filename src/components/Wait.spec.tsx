import * as React from 'react'
import Describe from './Describe'
import Wait from './Wait'
import Run from './RunCommand'
import run from './run'

run(() => (
  <Describe label="Wait milliseconds">
    <Run
      label="Set start time"
      function={ async ctx => {
        ctx.state.time = Date.now()
      } }
    />
    <Wait milliseconds={ 500 } />
    <Run
      label="Set end time"
      function={ async ctx => {
        const now = Date.now()
        const diff = now - ctx.state.time
        expect(diff < 510).toBe(true)
      } }
    />
  </Describe>
))

run(() => (
  <Describe label="Wait seconds">
    <Run
      label="Set start time"
      function={ async ctx => {
        ctx.state.time = Date.now()
      } }
    />
    <Wait seconds={ 0.5 } />
    <Run
      label="Set end time"
      function={ async ctx => {
        const now = Date.now()
        const diff = now - ctx.state.time
        expect(diff < 510).toBe(true)
      } }
    />
  </Describe>
))
