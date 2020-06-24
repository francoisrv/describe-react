import colors from 'colors'
import { assert } from '../entities/Assert'
import React from 'react'
import run from '../run'
import Describe from './Describe'
import Render from './Render'
import Expect from './Expect'
import Property from './Property'
import One from './One'
import { Of, UnitPropertyIdentifier, UnitPropertiesIdentifier } from '../types'
import State from './State'

const lambda = () => {}

run(() => (
  <Describe label="Expect target (not) to have state">
    <Render>
      <div />
    </Render>

    <Expect
      first element
      toHaveState="foo"
      notToHaveState="foo"
      label={ `State identifier is a ${ colors.bold('string') }` }
    />

    <Expect
      first element
      toHaveState={ /foo/ }
      notToHaveState={ /foo/ }
      label={ `State identifier is a ${ colors.bold('regular expression') }` }
    />

    <Expect
      first element
      toHaveState={{ foo: 42 }}
      notToHaveState={{ foo: 42 }}
      label={ `State identifier is an ${ colors.bold('object') }` }
    />
    
    <Expect
      first element
      toHaveState={ <State name="foo" /> }
      notToHaveState={ <State name="foo" /> }
      label={ `State identifier is a ${ colors.bold('<State name:string>') }` }
    />

    <Expect
      first element
      toHaveState={ <State name="foo" value={ true } /> }
      notToHaveState={ <State name="foo" value={ true } /> }
      label={ `State identifier is a ${ colors.bold('<State name:string value:any>') }` }
    />

    <Expect
      first element
      toHaveState={ <State name="foo" assert={ lambda } /> }
      notToHaveState={ <State name="foo" assert={ lambda } /> }
      label={ `State identifier is a ${ colors.bold('<State name:string assert:function>') }` }
    />

    <Expect
      first element
      toHaveState={ assert(lambda) }
      notToHaveState={ assert(lambda) }
      label={ `State identifier is an ${ colors.bold('assertion') }` }
    />
  </Describe>
))