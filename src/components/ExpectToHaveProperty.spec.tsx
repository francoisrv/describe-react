import colors from 'colors'
import { assert } from '../entities/Assert'
import React from 'react'
import run from '../run'
import Describe from './Describe'
import Render from './Render'
import Expect from './Expect'
import Property from './Property'
import One from './One'
import { Of, UnitPropertyIdentifier } from '../types'

const Duda = () => <span />

function lambda() {}

run(() => (
  <Describe label="Expect target (not) to have property">
    <Render>
      <div />
    </Render>

    <Expect only
      first
      toHaveProperty={[ 'foo', /bar/ ]}
      label={ `Type identifier is an ${ colors.bold('array') }` }
    />

    <Expect
      first element
      toHaveProperty={{ foo: 'bar' }}
      label={ `Type identifier is an ${ colors.bold('object') }` }
    />

    <Expect
      first element
      toHaveProperty="div"
      notToHaveProperty="div"
      label={ `Type identifier is a ${ colors.bold('string') }` }
    />

    <Expect
      first element
      toHaveProperty={ /div/ }
      notToHaveProperty={ /div/ }
      label={ `Type identifier is a ${ colors.bold('regular expression') }` }
    />

    <Expect
      first element
      toHaveProperty={ <Property name="foo" /> }
      notToHaveProperty={ <Property name="foo" /> }
      label={ `Type identifier is a ${ colors.bold('<Property name:string />') }` }
    />

    <Expect
      first element
      toHaveProperty={ <Property name={ /foo/ } /> }
      notToHaveProperty={ <Property name={ /foo/ } /> }
      label={ `Type identifier is a ${ colors.bold('<Property name:RegExp />') }` }
    />

    <Expect
      first element
      toHaveProperty={ <Property name="foo" value="keys" /> }
      notToHaveProperty={ <Property name="foo" value="keys" /> }
      label={ `Type identifier is a ${ colors.bold('<Property name:any value:any />') }` }
    />

    <Expect
      first element
      toHaveProperty={ <Property value="keys" /> }
      notToHaveProperty={ <Property value="keys" /> }
      label={ `Type identifier is a ${ colors.bold('<Property value:any />') }` }
    />

    <Expect
      first element
      toHaveProperty={ <Property name="foo" assert={ lambda } /> }
      notToHaveProperty={ <Property name="foo" assert={ lambda } /> }
      label={ `Type identifier is a ${ colors.bold('<Property name:string assert:function />') }` }
    />

    <Expect
      first element
      toHaveProperty={ assert(lambda, 'is a hot property') }
      notToHaveProperty={ assert(lambda, 'is a hot property') }
      label={ `Type identifier is an ${ colors.bold('assertion') }` }
    />

    <Expect
      first element
      toHaveProperty={ <One<Of<UnitPropertyIdentifier>> of={[ 'id', /id/, <Property name="id" /> ]} /> }
      notToHaveProperty={ <One<Of<UnitPropertyIdentifier>> of={[ 'id', /id/, <Property name="id" /> ]} /> }
      label={ `Type identifier is ${ colors.bold('one of') }` }
    />
  </Describe>
))