import React from 'react'
import ReactTestRenderer from 'react-test-renderer'

import { TypeDescriber, hasType, isOneOf, isNot, isNotOneOf } from '../..'

function Foo() {
  return <div />
}

function Bar() {
  return <div />
}

function hasTypeSpec(
  label: string,
  context: React.ReactElement<any>,
  describer: TypeDescriber,
  failer: any
) {
  it(label, () => {
    const elem = ReactTestRenderer.create(context)
    hasType(elem.root, describer)
  })
  it(`SHOULD FAIL: ${ label }`, () => {
    const elem = ReactTestRenderer.create(context)
    try {
      hasType(elem.root, failer)
      throw new Error('Should have failed')
    } catch (error) {
      expect(error.message).not.toEqual('Should have failed')
    }
  })
}

describe('Lib / Describers / Has Type', () => {
  hasTypeSpec(
    'string',
    <span />,
    'span',
    'div'
  )

  hasTypeSpec(
    'component',
    <Foo />,
    Foo,
    Bar
  )

  hasTypeSpec(
    'one of',
    <Foo />,
    isOneOf(Bar, Foo),
    isOneOf('div', 'span', Bar)
  )

  hasTypeSpec(
    'not',
    <Foo />,
    isNot(Bar),
    isNot(Foo)
  )

  hasTypeSpec(
    'not one of',
    <Foo />,
    isNotOneOf(Bar, 'span'),
    isNotOneOf(Bar, 'span', Foo),
  )
})
