import colors from 'colors'
import React from 'react'
import run from '../run'
import Describe from './Describe'
import Render from './Render'
import Expect from './Expect'
import { Is } from './Is'

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
      toHaveType={ <Is not="span" /> }
      notToHaveType={ <Is not="span" /> }
      label={ `type identifier is ${ colors.bold('<Is not />') }` }
    />
  </Describe>
))