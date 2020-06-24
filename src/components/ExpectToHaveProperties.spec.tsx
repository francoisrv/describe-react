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

const Duda = () => <span />

function lambda() {}

run(() => (
  <Describe label="Expect target (not) to have properties">
    <Render>
      <div />
    </Render>

    <Expect
      first element
      toHaveProperties={[ 'div', 'span' ]}
      notToHaveProperties={[ 'div', 'span' ]}
      label={ `properties identifier is an ${ colors.bold('array of strings') }` }
    />

    <Expect
      first element
      toHaveProperties={[ /div/, /span/ ]}
      notToHaveProperties={[ /div/, /span/ ]}
      label={ `properties identifier is an ${ colors.bold('array of regular expressions') }` }
    />

    <Expect
      first element
      toHaveProperties={[ <One of={['id', /class/]} /> ]}
      notToHaveProperties={[ <One of={['id', /class/]} /> ]}
      label={ `properties identifier is an ${ colors.bold('array of ones of') }` }
    />

    <Expect
      first element
      toHaveProperties={[ <Property name="foo" assert={ lambda } /> ]}
      notToHaveProperties={[ <Property name="foo" assert={ lambda } /> ]}
      label={ `properties identifier is an ${ colors.bold('array of <Property />') }` }
    />

    <Expect
      first element
      toHaveProperties={[ <One of={[
        <Property name="foo" />,
        <Property value={ 27 } />
      ]} /> ]}
      notToHaveProperties={[ <One of={[
        <Property name="foo" />,
        <Property value={ 27 } />
      ]} /> ]}
      label={ `properties identifier is an ${ colors.bold('array of one ofs <Property />') }` }
    />

    <Expect
      first element
      toHaveProperties={[ 'foo', /span/, <One of={['id', /class/]} />, <Property name="foo" assert={ lambda } />  ]}
      notToHaveProperties={[ 'foo', /span/, <One of={['id', /class/]} />, <Property name="foo" assert={ lambda } />  ]}
      label={ `properties identifier is an ${ colors.bold('array of all') }` }
    />

    <Expect
      first element
      toHaveProperties={ assert(lambda) }
      notToHaveProperties={ assert(lambda) }
      label={ `properties identifier is an ${ colors.bold('assertion') }` }
    />
  </Describe>
))