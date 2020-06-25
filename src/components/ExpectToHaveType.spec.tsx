import colors from 'colors'
import React from 'react'
import run from '../run'
import Describe from './Describe'
import Render from './Render'
import Expect from './Expect'
import One from './One'
import { Of, UnitTypeIdentifier } from '../types'
import { assert } from '../entities/Assert'

const Duda = () => <span />

function lambda() {}

run(() => (
  <Describe label="Expect target (not) to have type">
    <Render>
      <div />
    </Render>

    <Expect
      root element
      toHaveType="div"
      notToHaveType="div"
      label={ `type identifier is a ${ colors.bold('string') }` }
    />

    <Expect
      root element
      toHaveType={Duda}
      notToHaveType={Duda}
      label={ `type identifier is a ${ colors.bold('react component') }` }
    />

    <Expect
      root element
      toHaveType={ <One<Of<UnitTypeIdentifier>> of={[ 'div', Duda, assert(lambda, 'is a valid type') ]} /> }
      notToHaveType={ <One<Of<UnitTypeIdentifier>> of={[ 'div', Duda, assert(lambda, 'is a valid type') ]} /> }
      label={ `type identifier is ${ colors.bold('one of') }` }
    />
  </Describe>
))