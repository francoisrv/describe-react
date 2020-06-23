import React from 'react'
import ReactTestRenderer from 'react-test-renderer'

import { TypeDescriber } from '../..'
import expectElementType, { ExpectElementTypeLabel } from './expectElementType'

function Foo() {
  return <div />
}

function Bar() {
  return <div />
}

function expectElementTypeSpec(
  title: string,
  context: React.ReactElement<any>,
  label: ExpectElementTypeLabel,
  describer: TypeDescriber | TypeDescriber[],
  failer: any
) {
  it(title, () => {
    const elem = ReactTestRenderer.create(context)
    expectElementType(elem.root, label as any, describer as any)
  })
  it(`SHOULD FAIL: ${ title }`, () => {
    const elem = ReactTestRenderer.create(context)
    try {
      expectElementType(elem.root, label as any, failer)
      throw new Error('Should have failed')
    } catch (error) {
      expect(error.message).not.toEqual('Should have failed')
    }
  })
}

describe('Lib / Describers / Has Type', () => {
  expectElementTypeSpec(
    'string',
    <span />,
    'toHaveType',
    'span',
    'div'
  )

  expectElementTypeSpec(
    'component',
    <Foo />,
    'toHaveType',
    Foo,
    Bar
  )

  expectElementTypeSpec(
    'one of',
    <Foo />,
    'toHaveOneOfTheseTypes',
    [Bar, Foo],
    ['div', 'span', Bar]
  )

  expectElementTypeSpec(
    'not',
    <Foo />,
    'notToHaveType',
    Bar,
    Foo
  )

  expectElementTypeSpec(
    'not one of',
    <Foo />,
    'notToHaveOneOfTheseTypes',
    [Bar, 'span'],
    [Bar, 'span', Foo],
  )
})
