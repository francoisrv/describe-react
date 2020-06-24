import run from './run'
import Describe from './components/Describe'
import React from 'react'
import Render from './components/Render'
import Expect from './components/Expect'
import { assert } from './entities/Assert'
import One from './components/One'
import { Of, UnitTypeIdentifier, UnitTextIdentifier, UnitPropertyIdentifier } from './types'
import Property from './components/Property'
import colors from 'colors'

const Duda = () => <span />

function lambda() {}

describe('README', () => {
  // run(() => (
  //   <Describe label="Expect target (not) to have type">
  //     <Render>
  //       <div />
  //     </Render>

  //     <Expect
  //       root element
  //       toHaveType="div"
  //       notToHaveType="div"
  //       label={ `type identifier is a ${ colors.bold('string') }` }
  //     />

  //     <Expect
  //       root element
  //       toHaveType={Duda}
  //       notToHaveType={Duda}
  //       label={ `type identifier is a ${ colors.bold('react component') }` }
  //     />

  //     <Expect
  //       root element
  //       toHaveType={ assert(lambda, 'is a valid type') }
  //       notToHaveType={ assert(lambda, 'is a valid type') }
  //       label={ `type identifier is an ${ colors.bold('assertion') }` }
  //     />

  //     <Expect
  //       root element
  //       toHaveType={ <One<Of<UnitTypeIdentifier>> of={[ 'div', Duda, assert(lambda, 'is a valid type') ]} /> }
  //       notToHaveType={ <One<Of<UnitTypeIdentifier>> of={[ 'div', Duda, assert(lambda, 'is a valid type') ]} /> }
  //       label={ `type identifier is ${ colors.bold('one of') }` }
  //     />
  //   </Describe>
  // ))

  // run(() => (
  //   <Describe label="Expect target (not) to have text">
  //     <Render>
  //       <div />
  //     </Render>

  //     <Expect
  //       first element
  //       toHaveText="foo"
  //       notToHaveText="foo"
  //       label={ `text identifier is a ${ colors.bold('string') }` }
  //     />

  //     <Expect
  //       first element
  //       toHaveText={/foo/}
  //       notToHaveText={/foo/}
  //       label={ `text identifier is a ${ colors.bold('regular expression') }` }
  //     />

  //     <Expect
  //       first element
  //       toHaveText={assert(lambda, 'is a nice text')}
  //       notToHaveText={assert(lambda, 'is a nice text')}
  //       label={ `text identifier is an ${ colors.bold('assertion') }` }
  //     />

  //     <Expect
  //       first element
  //       toHaveText={<One<Of<UnitTextIdentifier>> of={['foo', /bar/, assert(lambda, 'is a nice text')]} />}
  //       notToHaveText={<One<Of<UnitTextIdentifier>> of={['foo', /bar/, assert(lambda, 'is a nice text')]} />}
  //       label={ `text identifier is ${ colors.bold('one of') }` }
  //     />
  //   </Describe>
  // ))

  run(() => (
    <Describe label="Expect target (not) to have property">
      <Render>
        <div />
      </Render>

      <Expect
        first element
        toHaveProperty="div"
        notToHaveProperty="div"
        label={ `type identifier is a ${ colors.bold('string') }` }
      />

      <Expect
        first element
        toHaveProperty={ /div/ }
        notToHaveProperty={ /div/ }
        label={ `type identifier is a ${ colors.bold('regular expression') }` }
      />

      <Expect
        first element
        toHaveProperty={ <Property name="foo" /> }
        notToHaveProperty={ <Property name="foo" /> }
        label={ `type identifier is a ${ colors.bold('<Property name:string />') }` }
      />

      <Expect
        first element
        toHaveProperty={ <Property name={ /foo/ } /> }
        notToHaveProperty={ <Property name={ /foo/ } /> }
        label={ `type identifier is a ${ colors.bold('<Property name:RegExp />') }` }
      />

      <Expect
        first element
        toHaveProperty={ <Property name="foo" value="keys" /> }
        notToHaveProperty={ <Property name="foo" value="keys" /> }
        label={ `type identifier is a ${ colors.bold('<Property name:any value:any />') }` }
      />

      <Expect
        first element
        toHaveProperty={ <Property value="keys" /> }
        notToHaveProperty={ <Property value="keys" /> }
        label={ `type identifier is a ${ colors.bold('<Property value:any />') }` }
      />
      
      <Expect
        first element
        toHaveProperty={ <Property>{ lambda }</Property> }
        notToHaveProperty={ <Property>{ lambda }</Property> }
        label={ `type identifier is a ${ colors.bold('<Property>Function</Property>') }` }
      />

      <Expect
        first element
        toHaveProperty={ <Property name="foo">{ lambda }</Property> }
        notToHaveProperty={ <Property name="foo">{ lambda }</Property> }
        label={ `type identifier is a ${ colors.bold('<Property name:string>Function</Property>') }` }
      />

      <Expect
        first element
        toHaveProperty={ assert(lambda, 'is a hot property') }
        notToHaveProperty={ assert(lambda, 'is a hot property') }
        label={ `type identifier is an ${ colors.bold('assertion') }` }
      />

      <Expect
        first element
        toHaveProperty={ <One<Of<UnitPropertyIdentifier>> of={[ 'id', /id/, <Property name="id" /> ]} /> }
        notToHaveProperty={ <One<Of<UnitPropertyIdentifier>> of={[ 'id', /id/, <Property name="id" /> ]} /> }
        label={ `type identifier is ${ colors.bold('one of') }` }
      />
    </Describe>
  ))
})
